export default function Header() {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-[#141414]/90 px-6 py-8 shadow-2xl shadow-black/30">
      <div className="absolute -top-24 right-6 h-40 w-40 rounded-full bg-amber-500/20 blur-3xl" />
      <div className="absolute -bottom-20 left-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="relative flex flex-col gap-4">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-emerald-300/80">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)] animate-pulse" />
          Live
        </div>
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl bg-gradient-to-r from-amber-300 via-amber-400 to-emerald-300 bg-clip-text">
            Bazaar Brain
          </h1>
          <p className="mt-2 text-base text-amber-100/80 sm:text-lg">
            रोज़ का हिसाब, AI का जवाब
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-1 text-sm font-semibold text-amber-200">
            Lucknow · Hazratganj
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-200 float-slow">
            Hyperlocal Forecast Engine
          </span>
        </div>
      </div>
    </header>
  )
}
