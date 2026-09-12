import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Mic,
  Video,
  Play,
  Pause,
  X,
  Check,
  ShieldAlert,
  Volume2,
  Film,
  Square,
  Sparkles,
} from "lucide-react";
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

  // Timer Effect
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

  // Escape key handler for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewing(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Unmount Cleanup
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
          ? "Camera and microphone access is needed to record video. Please allow access in browser permissions."
          : "Microphone access is needed to record audio. Please allow access in browser permissions.",
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

    if (playing === r.id) {
      audioEl.current?.pause();
      audioEl.current = null;
      setPlaying(null);
      return;
    }

    audioEl.current?.pause();
    audioEl.current = null;

    if (rec.mediaUrl) {
      const el = new Audio(rec.mediaUrl);
      el.onended = () => setPlaying(null);
      void el.play().catch(() => setPlaying(null));
      audioEl.current = el;
      setPlaying(r.id);
    } else {
      // Graceful feedback for items without underlying media streams
      setPlaying(r.id);
      setTimeout(() => setPlaying(null), 3000);
    }
  };

  return (
    <div className="w-full bg-slate-900 text-slate-100 py-12 px-6 border-b border-slate-800">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold tracking-widest uppercase mb-1">
            <Volume2 className="w-4 h-4 text-amber-500" /> SECTION (B) · AUDIO VISUAL VAULT
          </div>
          <h1 className="text-3xl font-serif font-bold text-white">The Living Record</h1>
          <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
            Songs, chants, crafts, and living traditions — captured as audio or video before the last voice
            that holds them goes quiet. Every capture is reviewed by a host before joining the public vault.
          </p>
        </div>

        {/* Capture Studio & Metrics */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Recorder Interface */}
          <div className="lg:col-span-3 rounded-xl border border-slate-800 bg-slate-950/60 p-6 shadow-sm flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between">
              <div className="inline-flex rounded-lg border border-slate-800 bg-slate-900 p-1">
                {(["audio", "video"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => !recording && setMode(m)}
                    disabled={recording}
                    className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-bold transition-all ${
                      mode === m
                        ? "bg-amber-500 text-slate-950 shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    } ${recording ? "cursor-not-allowed opacity-50" : ""}`}
                  >
                    {m === "audio" ? <Mic className="w-3.5 h-3.5" /> : <Video className="w-3.5 h-3.5" />}
                    <span className="capitalize">{m} Capture</span>
                  </button>
                ))}
              </div>
              <span className="font-mono text-[10px] text-slate-500 tracking-wider uppercase">
                Studio Viewfinder
              </span>
            </div>

            {/* Viewfinder Display */}
            <div className="relative flex h-48 items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-slate-900 border border-slate-800 px-5">
              {mode === "video" ? (
                <>
                  <video
                    ref={previewVideo}
                    playsInline
                    muted
                    className="h-full w-full rounded-lg object-cover"
                  />
                  {!recording && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 gap-2">
                      <Film className="w-8 h-8 text-slate-600" />
                      <p className="font-mono text-[10px] tracking-[0.2em] text-slate-400 uppercase">
                        Camera Ready · Click Record To Start
                      </p>
                    </div>
                  )}
                </>
              ) : (
                BARS.map((b, i) => (
                  <span
                    key={i}
                    className="w-1.5 rounded-full bg-amber-400 transition-all duration-300"
                    style={{
                      height: "100%",
                      transformOrigin: "center",
                      opacity: recording ? 0.6 + ((i % 5) * 0.08) : 0.2,
                      transform: recording ? undefined : "scaleY(0.08)",
                      animation: recording
                        ? `virasat-wave ${b.dur}ms ease-in-out ${b.delay}ms infinite`
                        : undefined,
                    }}
                  />
                ))
              )}
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="font-mono text-3xl font-bold text-amber-400 tracking-tight">{fmt(seconds)}</p>
                <p className="mt-0.5 font-mono text-[10px] tracking-widest text-slate-400 uppercase">
                  {recording
                    ? mode === "video"
                      ? "RECORDING · HD VIDEO + AUDIO"
                      : "RECORDING · 48kHz MONO"
                    : "READY TO CAPTURE"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {(recording || seconds > 0) && (
                  <button
                    onClick={stop}
                    className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-500/20 transition-all"
                  >
                    Complete & Review
                  </button>
                )}
                <button
                  aria-label={recording ? "Stop recording" : "Start recording"}
                  onClick={toggleRecord}
                  className={`grid size-12 place-items-center rounded-full text-slate-950 font-bold transition-transform hover:scale-105 shadow-md ${
                    recording
                      ? "bg-rose-500 text-white ring-4 ring-rose-500/20"
                      : "bg-amber-400 ring-4 ring-amber-400/20"
                  }`}
                >
                  {recording ? <Square className="w-5 h-5 fill-current" /> : <Mic className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {micError && (
              <div role="alert" className="flex items-center gap-2 text-xs text-rose-400 bg-rose-950/40 border border-rose-800/60 p-3 rounded-lg">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{micError}</span>
              </div>
            )}
          </div>

          {/* Index & Metrics */}
          <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-950/60 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <p className="font-mono text-[10px] tracking-widest text-amber-500 font-bold uppercase">VAULT METRICS</p>
              <dl className="mt-5 space-y-4">
                <div className="flex items-baseline justify-between border-b border-slate-800/60 pb-3">
                  <dt className="text-xs text-slate-400 font-medium">Voices Held</dt>
                  <dd className="font-mono text-2xl font-bold text-amber-400">{all.length}</dd>
                </div>
                <div className="flex items-baseline justify-between border-b border-slate-800/60 pb-3">
                  <dt className="text-xs text-slate-400 font-medium">Awaiting Review</dt>
                  <dd className="font-mono text-2xl font-bold text-amber-400">{pending.length}</dd>
                </div>
                <div className="flex items-baseline justify-between border-b border-slate-800/60 pb-3">
                  <dt className="text-xs text-slate-400 font-medium">Dialects / Languages</dt>
                  <dd className="font-mono text-2xl font-bold text-amber-400">
                    {new Set(all.map((r) => r.language)).size}
                  </dd>
                </div>
              </dl>
            </div>
            <p className="border-t border-slate-800 pt-4 text-xs text-slate-400 leading-relaxed">
              Every capture is transcribed, tagged by region, and published only after host approval — safeguarding community authenticity.
            </p>
          </div>
        </div>

        {/* Host Review Queue */}
        {pending.length > 0 && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-950/10 p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <p className="font-mono text-xs font-bold tracking-widest text-amber-400 flex items-center gap-1.5 uppercase">
                <Sparkles className="w-4 h-4 text-amber-400" /> Host Review Queue
              </p>
              <span className="font-mono text-[10px] font-semibold text-amber-300/80 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                {pending.length} AWAITING APPROVAL
              </span>
            </div>
            <ul className="mt-4 space-y-4">
              {pending.map((p) => (
                <li
                  key={p.id}
                  className="grid gap-4 rounded-lg border border-slate-800 bg-slate-900/90 p-4 md:grid-cols-[minmax(0,18rem)_1fr]"
                >
                  <div className="overflow-hidden rounded-md bg-black/60 flex items-center justify-center">
                    {p.mediaType === "video" ? (
                      <video src={p.mediaUrl} controls playsInline className="w-full max-h-40 object-cover" />
                    ) : (
                      <div className="p-3 w-full">
                        <audio src={p.mediaUrl} controls className="w-full" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{p.title}</p>
                      <p className="mt-1 font-mono text-[10px] tracking-wider text-slate-400 uppercase">
                        {(p.mediaType ?? "audio")} · {p.state} · {p.duration}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => approve(p.id)}
                        className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs font-bold text-white transition-all shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve & Publish
                      </button>
                      <button
                        onClick={() => reject(p.id)}
                        className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 px-3.5 py-2 text-xs font-bold text-slate-300 transition-all"
                      >
                        <X className="w-3.5 h-3.5" /> Discard
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* State Filters */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(["All", ...STATES] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all ${
                  filter === s
                    ? "bg-amber-400 text-slate-950 font-bold shadow-sm"
                    : "border border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Vault Archive List */}
          <ul className="divide-y divide-slate-800/80 rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden shadow-sm">
            {list.map((r) => {
              const isPlaying = playing === r.id;
              const isVideo = (r as SavedRecording).mediaType === "video";
              return (
                <li key={r.id} className="flex flex-wrap items-center gap-4 px-5 py-3.5 hover:bg-slate-900/50 transition-colors">
                  <button
                    aria-label={
                      isVideo
                        ? `Watch ${r.title}`
                        : isPlaying
                          ? `Pause ${r.title}`
                          : `Play ${r.title}`
                    }
                    onClick={() => togglePlay(r)}
                    className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all ${
                      isPlaying
                        ? "border-amber-400 bg-amber-400/20 text-amber-300"
                        : "border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-400 hover:text-amber-400"
                    }`}
                  >
                    {isVideo ? (
                      <Film className="w-4 h-4" />
                    ) : isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 translate-x-0.5" />
                    )}
                  </button>

                  <div className="min-w-[12rem] flex-1">
                    <p className="text-sm font-medium text-slate-200">{r.title}</p>
                    <p className="mt-0.5 font-mono text-[10px] tracking-wider text-slate-400 uppercase">
                      {r.narrator} · {r.state} · {r.language}
                    </p>
                  </div>

                  {isPlaying && !isVideo && (
                    <span className="flex items-end gap-1 h-4">
                      {[0, 1, 2, 3].map((i) => (
                        <span
                          key={i}
                          className="w-0.5 rounded-full bg-amber-400"
                          style={{
                            height: "100%",
                            animation: `virasat-wave ${500 + i * 120}ms ease-in-out infinite`,
                          }}
                        />
                      ))}
                    </span>
                  )}

                  <span className="font-mono text-xs text-slate-400">{r.duration}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Video Player Overlay Modal */}
        {viewing && (
          <div
            className="fixed inset-0 z-50 grid place-items-center bg-slate-950/80 backdrop-blur-sm p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`Playing ${viewing.title}`}
            onClick={() => setViewing(null)}
          >
            <div
              className="w-full max-w-2xl rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-2xl space-y-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <p className="text-sm font-semibold text-white">{viewing.title}</p>
                <button
                  onClick={() => setViewing(null)}
                  aria-label="Close player"
                  className="grid size-7 place-items-center rounded-full border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <video
                src={viewing.mediaUrl}
                controls
                autoPlay
                playsInline
                className="w-full rounded-lg bg-black aspect-video object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OralVault;