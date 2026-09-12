import { useEffect, useMemo, useRef, useState } from "react";
import { RECORDINGS, STATES, type Recording, type StateName } from "@/data/virasat";

type SavedRecording = Recording & { audioUrl?: string };

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
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [saved, setSaved] = useState<SavedRecording[]>([]);
  const [playing, setPlaying] = useState<string | null>(null);
  const [micError, setMicError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const mediaStream = useRef<MediaStream | null>(null);
  const chunks = useRef<Blob[]>([]);
  const audioEl = useRef<HTMLAudioElement | null>(null);
  const savedRef = useRef<SavedRecording[]>([]);
  const secondsRef = useRef(0);

  useEffect(() => {
    savedRef.current = saved;
  }, [saved]);

  useEffect(() => {
    secondsRef.current = seconds;
  }, [seconds]);

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
      savedRef.current.forEach((r) => r.audioUrl && URL.revokeObjectURL(r.audioUrl));
    };
  }, []);

  const all = useMemo(() => [...saved, ...RECORDINGS], [saved]);
  const list = filter === "All" ? all : all.filter((r) => r.state === filter);

  const startRecording = async () => {
    setMicError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      chunks.current = [];
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunks.current, {
          type: chunks.current[0]?.type || "audio/webm",
        });
        const audioUrl = URL.createObjectURL(blob);
        setSaved((prev) => [
          {
            id: `new-${Date.now()}`,
            title: `Untitled field recording ${prev.length + 1}`,
            narrator: "You",
            state: filter === "All" ? "Uttar Pradesh" : filter,
            duration: fmt(secondsRef.current),
            language: "Unlabelled",
            audioUrl,
          },
          ...prev,
        ]);
        setSeconds(0);
        stream.getTracks().forEach((t) => t.stop());
        mediaStream.current = null;
      };
      mediaRecorder.current = recorder;
      recorder.start();
      setSeconds(0);
      setRecording(true);
    } catch {
      setMicError("Microphone access is needed to record. Please allow it and try again.");
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

  const togglePlay = (r: Recording | SavedRecording) => {
    const audioUrl = (r as SavedRecording).audioUrl;
    if (playing === r.id) {
      audioEl.current?.pause();
      audioEl.current = null;
      setPlaying(null);
      return;
    }
    audioEl.current?.pause();
    audioEl.current = null;
    if (audioUrl) {
      const el = new Audio(audioUrl);
      el.onended = () => setPlaying(null);
      void el.play().catch(() => setPlaying(null));
      audioEl.current = el;
    }
    setPlaying(r.id);
  };

  return (
    <div className="animate-rise py-12">
      <p className="eyebrow">(b) Oral Vault</p>
      <h1 className="mt-4 font-display text-4xl italic text-balance">The spoken record</h1>
      <p className="mt-4 max-w-[52ch] text-pretty text-muted-foreground">
        Songs, chants and working memory, captured before the last voice that holds them goes
        quiet. Press record and the vault listens.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-6">
          <div className="flex h-40 items-center justify-center gap-[5px] rounded-xl bg-surface px-5">
            {BARS.map((b, i) => (
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
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="font-display text-3xl italic text-lamp-soft">{fmt(seconds)}</p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
                {recording ? "RECORDING · 48kHz MONO" : "READY · PRESS TO CAPTURE"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {(recording || seconds > 0) && (
                <button
                  onClick={stop}
                  className="rounded-lg border border-border px-4 py-2.5 text-sm text-foreground hover:border-lamp/50"
                >
                  Save to vault
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
              <dt className="text-sm text-muted-foreground">States covered</dt>
              <dd className="font-display text-2xl italic text-lamp-soft">6</dd>
            </div>
            <div className="flex items-baseline justify-between">
              <dt className="text-sm text-muted-foreground">Languages</dt>
              <dd className="font-display text-2xl italic text-lamp-soft">
                {new Set(all.map((r) => r.language)).size}
              </dd>
            </div>
          </dl>
          <p className="mt-6 border-t border-border pt-4 text-sm text-muted-foreground">
            Every capture is transcribed, tagged by region, and mirrored to the community archive.
          </p>
        </div>
      </div>

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
              aria-label={playing === r.id ? `Pause ${r.title}` : `Play ${r.title}`}
              onClick={() => togglePlay(r)}
              className="grid size-9 shrink-0 place-items-center rounded-full border border-lamp/40 text-lamp hover:bg-lamp/10"
            >
              {playing === r.id ? "❚❚" : "▶"}
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
    </div>
  );
}
