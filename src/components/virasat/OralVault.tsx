import { useEffect, useMemo, useRef, useState } from "react";
import { RECORDINGS, STATES, type Recording, type StateName } from "@/data/virasat";

type CaptureType = "audio" | "video";
type SavedRecording = Recording & { mediaUrl?: string; mediaType?: CaptureType };
type PendingRecording = SavedRecording & { submittedAt: number };

const BARS = Array.from({ length: 28 }, (_, i) => ({
  dur: 700 + ((i * 137) % 700),
  delay: (i * 53) % 500,
}));

function fmt(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function OralVault() {
  const [filter, setFilter] = useState<StateName | "All">("All");
  const [mode, setMode] = useState<CaptureType>("audio");
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [saved, setSaved] = useState<SavedRecording[]>([]);
  const [pending, setPending] = useState<PendingRecording[]>([]);
  const [playing, setPlaying] = useState<string | null>(null);
  const [viewing, setViewing] = useState<SavedRecording | null>(null);
  const [micError, setMicError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const mediaStream = useRef<MediaStream | null>(null);
  const chunks = useRef<Blob[]>([]);
  const audioEl = useRef<HTMLAudioElement | null>(null);
  const previewVideo = useRef<HTMLVideoElement | null>(null);
  const savedRef = useRef<SavedRecording[]>([]);
  const pendingRef = useRef<PendingRecording[]>([]);
  const secondsRef = useRef(0);
  const modeRef = useRef<CaptureType>("audio");

  useEffect(() => {
    savedRef.current = saved;
  }, [saved]);

  useEffect(() => {
    pendingRef.current = pending;
  }, [pending]);

  useEffect(() => {
    secondsRef.current = seconds;
  }, [seconds]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    if (recording) {
      timer.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [recording]);

  useEffect(() => {
    return () => {
      mediaStream.current?.getTracks().forEach((t) => t.stop());
      if (audioEl.current) {
        audioEl.current.pause();
        audioEl.current = null;
      }
      savedRef.current.forEach((r) => r.mediaUrl && URL.revokeObjectURL(r.mediaUrl));
      pendingRef.current.forEach((r) => r.mediaUrl && URL.revokeObjectURL(r.mediaUrl));
    };
  }, []);

  const all = useMemo(() => [...saved, ...RECORDINGS], [saved]);
  const list = filter === "All" ? all : all.filter((r) => r.state === filter);

  const startRecording = async () => {
    setMicError(null);
    const wantVideo = modeRef.current === "video";
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        wantVideo ? { audio: true, video: true } : { audio: true },
      );
      mediaStream.current = stream;
      chunks.current = [];
      if (wantVideo && previewVideo.current) {
        previewVideo.current.srcObject = stream;
        previewVideo.current.muted = true;
        void previewVideo.current.play().catch(() => {});
      }
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data);
      };
      recorder.onstop = () => {
        const capturedAs = wantVideo ? "video" : "audio";
        const blob = new Blob(chunks.current, {
          type: chunks.current[0]?.type || (wantVideo ? "video/webm" : "audio/webm"),
        });
        const mediaUrl = URL.createObjectURL(blob);
        setPending((prev) => [
          {
            id: `new-${Date.now()}`,
            title: `Untitled ${capturedAs} capture ${prev.length + 1}`,
            narrator: "You",
            state: filter === "All" ? "Uttar Pradesh" : filter,
            duration: fmt(secondsRef.current),
            language: "Unlabelled",
            mediaUrl,
            mediaType: capturedAs,
            submittedAt: Date.now(),
          },
          ...prev,
        ]);
        setSeconds(0);
        if (previewVideo.current) previewVideo.current.srcObject = null;
        stream.getTracks().forEach((t) => t.stop());
        mediaStream.current = null;
      };
      mediaRecorder.current = recorder;
      recorder.start();
      setSeconds(0);
      setRecording(true);
    } catch {
      setMicError(
        wantVideo
          ? "Camera and microphone access is needed to record video. Please allow it and try again."
          : "Microphone access is needed to record. Please allow it and try again.",
      );
    }
  };

  const stop = () => {
    setRecording(false);
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop();
    } else {
      setSeconds(0);
    }
  };

  const toggleRecord = () => {
    if (recording) {
      stop();
    } else {
      void startRecording();
    }
  };

  const approve = (id: string) => {
    setPending((prev) => {
      const item = prev.find((p) => p.id === id);
      if (item) {
        const { submittedAt: _submittedAt, ...rec } = item;
        setSaved((s) => [rec, ...s]);
      }
      return prev.filter((p) => p.id !== id);
    });
  };

  const reject = (id: string) => {
    setPending((prev) => {
      const item = prev.find((p) => p.id === id);
      if (item?.mediaUrl) URL.revokeObjectURL(item.mediaUrl);
      return prev.filter((p) => p.id !== id);
    });
  };

  const togglePlay = (r: Recording | SavedRecording) => {
    const rec = r as SavedRecording;
    if (rec.mediaType === "video" && rec.mediaUrl) {
      setViewing(rec);
      return;
    }
    const mediaUrl = rec.mediaUrl;
    if (playing === r.id) {
      audioEl.current?.pause();
      audioEl.current = null;
      setPlaying(null);
      return;
    }
    audioEl.current?.pause();
    audioEl.current = null;
    if (mediaUrl) {
      const el = new Audio(mediaUrl);
      el.onended = () => setPlaying(null);
      void el.play().catch(() => setPlaying(null));
      audioEl.current = el;
    }
    setPlaying(r.id);
  };

  return (
    <div className="animate-rise py-12">
      <p className="eyebrow">(b) Audio Visual Vault</p>
      <h1 className="mt-4 font-display text-4xl italic text-balance">The living record</h1>
      <p className="mt-4 max-w-[52ch] text-pretty text-muted-foreground">
        Songs, chants, crafts and living places — captured as audio or video before the last voice
        that holds them goes quiet. Every capture is reviewed by a host before it joins the public
        vault, so nothing wrong or explicit slips through.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-6">
          <div className="mb-5 inline-flex rounded-lg border border-border p-1">
            {(["audio", "video"] as const).map((m) => (
              <button
                key={m}
                onClick={() => !recording && setMode(m)}
                disabled={recording}
                className={`rounded-md px-4 py-1.5 text-xs capitalize transition-colors ${
                  mode === m
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                } ${recording ? "cursor-not-allowed opacity-60" : ""}`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="relative flex h-40 items-center justify-center gap-[5px] overflow-hidden rounded-xl bg-surface px-5">
            {mode === "video" ? (
              <>
                <video
                  ref={previewVideo}
                  playsInline
                  muted
                  className="h-full w-full rounded-lg object-cover"
                />
                {!recording && (
                  <p className="absolute inset-0 grid place-items-center font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
                    CAMERA PREVIEW · PRESS TO CAPTURE
                  </p>
                )}
              </>
            ) : (
              BARS.map((b, i) => (
                <span
                  key={i}
                  className="w-[5px] rounded-full bg-lamp"
                  style={{
                    height: "100%",
                    transformOrigin: "center",
                    opacity: recording ? 0.55 + ((i % 5) * 0.09) : 0.22,
                    transform: recording ? undefined : "scaleY(0.08)",
                    transition: recording ? undefined : "transform 400ms ease",
                    animation: recording
                      ? `virasat-wave ${b.dur}ms ease-in-out ${b.delay}ms infinite`
                      : undefined,
                  }}
                />
              ))
            )}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="font-display text-3xl italic text-lamp-soft">{fmt(seconds)}</p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
                {recording
                  ? mode === "video"
                    ? "RECORDING · HD VIDEO + AUDIO"
                    : "RECORDING · 48kHz MONO"
                  : "READY · PRESS TO CAPTURE"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {(recording || seconds > 0) && (
                <button
                  onClick={stop}
                  className="rounded-lg border border-border px-4 py-2.5 text-sm text-foreground hover:border-lamp/50"
                >
                  Submit for review
                </button>
              )}
              <button
                aria-label={recording ? "Stop recording" : "Start recording"}
                onClick={toggleRecord}
                className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground ring-4 ring-lamp/15 transition-transform hover:scale-105"
              >
                {recording ? (
                  <span className="flex gap-1">
                    <span className="block h-4 w-1.5 rounded-xs bg-primary-foreground" />
                    <span className="block h-4 w-1.5 rounded-xs bg-primary-foreground" />
                  </span>
                ) : (
                  <span className="block size-4 rounded-full bg-primary-foreground" />
                )}
              </button>
            </div>
          </div>

          {micError && (
            <p role="alert" className="mt-4 text-sm text-destructive">
              {micError}
            </p>
          )}
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <p className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">VAULT INDEX</p>
          <dl className="mt-4 space-y-4">
            <div className="flex items-baseline justify-between">
              <dt className="text-sm text-muted-foreground">Voices held</dt>
              <dd className="font-display text-2xl italic text-lamp-soft">{all.length}</dd>
            </div>
            <div className="flex items-baseline justify-between">
              <dt className="text-sm text-muted-foreground">Awaiting review</dt>
              <dd className="font-display text-2xl italic text-lamp-soft">{pending.length}</dd>
            </div>
            <div className="flex items-baseline justify-between">
              <dt className="text-sm text-muted-foreground">Languages</dt>
              <dd className="font-display text-2xl italic text-lamp-soft">
                {new Set(all.map((r) => r.language)).size}
              </dd>
            </div>
          </dl>
          <p className="mt-6 border-t border-border pt-4 text-sm text-muted-foreground">
            Every capture is transcribed, tagged by region, and published only after a host approves
            it — keeping the community archive safe and authentic.
          </p>
        </div>
      </div>

      {pending.length > 0 && (
        <div className="mt-10 rounded-2xl border border-lamp/40 bg-card p-6">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] tracking-[0.25em] text-lamp">HOST REVIEW QUEUE</p>
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
              {pending.length} AWAITING APPROVAL
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Review each submission below. Approve to publish it to the public vault, or reject to
            discard unsafe or explicit content.
          </p>
          <ul className="mt-5 space-y-5">
            {pending.map((p) => (
              <li
                key={p.id}
                className="grid gap-4 rounded-xl border border-border bg-surface p-4 md:grid-cols-[minmax(0,20rem)_1fr]"
              >
                <div className="overflow-hidden rounded-lg bg-black/40">
                  {p.mediaType === "video" ? (
                    <video src={p.mediaUrl} controls playsInline className="w-full" />
                  ) : (
                    <div className="p-4">
                      <audio src={p.mediaUrl} controls className="w-full" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-between gap-4">
                  <div>
                    <p className="text-sm text-foreground">{p.title}</p>
                    <p className="mt-0.5 font-mono text-[10px] tracking-widest text-muted-foreground">
                      {(p.mediaType ?? "audio").toUpperCase()} · {p.state.toUpperCase()} ·{" "}
                      {p.duration}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => approve(p.id)}
                      className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground transition-transform hover:scale-[1.02]"
                    >
                      Approve &amp; publish
                    </button>
                    <button
                      onClick={() => reject(p.id)}
                      className="rounded-lg border border-border px-4 py-2 text-sm text-foreground hover:border-destructive/60 hover:text-destructive"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-2">
        {(["All", ...STATES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-3.5 py-1.5 text-xs transition-colors ${
              filter === s
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:border-lamp/50 hover:text-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <ul className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
        {list.map((r) => (
          <li key={r.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
            <button
              aria-label={
                (r as SavedRecording).mediaType === "video"
                  ? `Watch ${r.title}`
                  : playing === r.id
                    ? `Pause ${r.title}`
                    : `Play ${r.title}`
              }
              onClick={() => togglePlay(r)}
              className="grid size-9 shrink-0 place-items-center rounded-full border border-lamp/40 text-lamp hover:bg-lamp/10"
            >
              {(r as SavedRecording).mediaType === "video" ? "▷" : playing === r.id ? "❚❚" : "▶"}
            </button>
            <div className="min-w-[12rem] flex-1">
              <p className="text-sm text-foreground">{r.title}</p>
              <p className="mt-0.5 font-mono text-[10px] tracking-widest text-muted-foreground">
                {r.narrator.toUpperCase()} · {r.state.toUpperCase()} · {r.language.toUpperCase()}
              </p>
            </div>
            {playing === r.id && (
              <span className="flex items-end gap-[3px] h-5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="w-[3px] rounded-full bg-lamp"
                    style={{
                      height: "100%",
                      transformOrigin: "center",
                      animation: `virasat-wave ${600 + i * 130}ms ease-in-out infinite`,
                    }}
                  />
                ))}
              </span>
            )}
            <span className="font-mono text-[11px] text-muted-foreground">{r.duration}</span>
          </li>
        ))}
      </ul>

      {viewing && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Playing ${viewing.title}`}
          onClick={() => setViewing(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl border border-border bg-card p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3">
              <p className="text-sm text-foreground">{viewing.title}</p>
              <button
                onClick={() => setViewing(null)}
                aria-label="Close player"
                className="grid size-8 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <video
              src={viewing.mediaUrl}
              controls
              autoPlay
              playsInline
              className="w-full rounded-lg bg-black"
            />
          </div>
        </div>
      )}
    </div>
  );
}
