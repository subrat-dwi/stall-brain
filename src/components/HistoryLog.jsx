import { ChevronDown, ChevronUp, Clock } from 'lucide-react'

function getFeedbackBadge(feedback) {
  if (feedback === 'up') {
    return {
      label: 'Actual: Accurate',
      color: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-200',
    }
  }
  if (feedback === 'down') {
    return {
      label: 'Actual: Lower than expected',
      color: 'border-rose-500/40 bg-rose-500/15 text-rose-200',
    }
  }
  return {
    label: 'Actual: Pending',
    color: 'border-zinc-700 bg-zinc-800/50 text-zinc-300',
  }
}

export default function HistoryLog({ history, collapsed, onToggle }) {
  const hasItems = history.length > 0

  return (
    <section className="mt-10">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-2xl border border-zinc-800 bg-[#141414] px-5 py-4 text-left transition hover:border-amber-400/50"
        aria-expanded={!collapsed}
      >
        <div>
          <p className="text-sm font-semibold text-amber-100">Past Forecasts</p>
          <p className="mt-1 text-xs text-zinc-500">Last 5 predictions</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Clock className="h-4 w-4" />
          {collapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </div>
      </button>

      {!collapsed ? (
        <div className="mt-4 space-y-3">
          {hasItems ? (
            history.map((entry) => {
              const badge = getFeedbackBadge(entry.feedback)
              return (
                <div
                  key={entry.id}
                  className="rounded-2xl border border-zinc-800 bg-[#121212] p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-zinc-100">
                        {entry.stallName}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {entry.dateLabel}
                      </p>
                    </div>
                    <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-200">
                      Expected: {entry.expectedCustomers}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                    <span className="rounded-full border border-zinc-700 bg-zinc-900/60 px-3 py-1 text-zinc-300">
                      Demand x{Number(entry.demandMultiplier).toFixed(2)}
                    </span>
                    <span
                      className={`rounded-full border px-3 py-1 ${badge.color}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="rounded-2xl border border-zinc-800 bg-[#121212] p-4 text-sm text-zinc-500">
              No forecasts yet. Your history will appear here after the first run.
            </div>
          )}
        </div>
      ) : null}
    </section>
  )
}
