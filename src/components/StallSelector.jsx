export default function StallSelector({ stalls, selectedId, onSelect }) {
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-amber-100">Select your stall</h2>
        <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
          7 types
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {stalls.map((stall) => {
          const selected = stall.id === selectedId
          return (
            <button
              key={stall.id}
              type="button"
              onClick={() => onSelect(stall.id)}
              aria-pressed={selected}
              className={`group flex flex-col items-start justify-between rounded-2xl border px-4 py-5 text-left transition-all duration-300 ${
                selected
                  ? 'border-amber-400/80 bg-amber-500/10 shadow-[0_0_25px_rgba(245,158,11,0.2)]'
                  : 'border-zinc-800 bg-[#151515] hover:-translate-y-1 hover:border-amber-400/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]'
              }`}
            >
              <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                {stall.emoji}
              </span>
              <span className="mt-3 text-sm font-semibold text-zinc-100">
                {stall.name}
              </span>
              <span className="mt-1 text-xs text-zinc-500">
                {stall.items.length} stock items
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
