import { Lightbulb, RefreshCw, TrendingDown, TrendingUp } from 'lucide-react'

const priorityOrder = {
  essential: 0,
  moderate: 1,
  optional: 2,
}

function getConfidenceStyles(level) {
  if (level?.toLowerCase() === 'high') {
    return 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40'
  }
  if (level?.toLowerCase() === 'low') {
    return 'bg-rose-500/20 text-rose-200 border-rose-500/40'
  }
  return 'bg-amber-500/20 text-amber-200 border-amber-500/40'
}

function getPriorityStyles(priority) {
  if (priority === 'essential') {
    return 'bg-emerald-500/15 text-emerald-200 border-emerald-500/30'
  }
  if (priority === 'moderate') {
    return 'bg-amber-500/15 text-amber-200 border-amber-500/30'
  }
  return 'bg-zinc-700/40 text-zinc-300 border-zinc-600/60'
}

function splitAdvice(specialAdvice) {
  if (!specialAdvice) return { en: '', hi: '' }
  const parts = specialAdvice.split('||').map((part) => part.trim())
  return {
    en: parts[0] || specialAdvice,
    hi: parts[1] || parts[0] || specialAdvice,
  }
}

export default function ForecastOutput({
  forecast,
  demandMultiplier,
  showHindi,
  onToggleHindi,
  onRegenerate,
}) {
  const confidenceStyles = getConfidenceStyles(forecast.confidenceLevel)
  const procurementList = [...(forecast.procurementList || [])].sort((a, b) => {
    return (priorityOrder[a.priority] ?? 3) - (priorityOrder[b.priority] ?? 3)
  })

  const { en: adviceEn, hi: adviceHi } = splitAdvice(forecast.specialAdvice)
  const summaryText = showHindi
    ? forecast.hindiSummary || forecast.summary
    : forecast.summary || 'Forecast ready for today.'
  const adviceText = showHindi ? adviceHi || adviceEn : adviceEn
  const expectedCustomers = Number.isFinite(forecast.expectedCustomers)
    ? Math.round(forecast.expectedCustomers)
    : '--'

  const trendUp = demandMultiplier >= 1.15
  const trendDown = demandMultiplier <= 0.9

  return (
    <section className="mt-8">
      <div className="rounded-3xl border border-amber-400/30 bg-[#171717] p-6 shadow-[0_0_40px_rgba(245,158,11,0.12)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-amber-300/80">
              Today&apos;s Forecast
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-100">
              {summaryText}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleHindi}
              className="rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-200 transition hover:border-amber-400/80"
            >
              {showHindi ? 'Show English' : 'हिंदी में देखें'}
            </button>
            <button
              type="button"
              onClick={onRegenerate}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-amber-400/70"
            >
              <RefreshCw size={16} />
              Regenerate
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-[#121212] p-5">
            <div className="flex items-center gap-3">
              <div className="text-4xl font-bold text-zinc-100">
                {expectedCustomers}
              </div>
              <div className="text-sm text-zinc-400">expected customers</div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-zinc-400">
              {trendUp ? (
                <TrendingUp className="h-5 w-5 text-emerald-300" />
              ) : trendDown ? (
                <TrendingDown className="h-5 w-5 text-rose-300" />
              ) : null}
              Demand multiplier: {demandMultiplier.toFixed(2)}x
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#121212] p-5">
            <p className="text-sm text-zinc-400">Peak hours</p>
            <div className="mt-3 inline-flex rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-200">
              {forecast.peakHours}
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              Confidence: <span className="font-semibold text-zinc-200">{forecast.confidenceReason}</span>
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#121212] p-5">
            <p className="text-sm text-zinc-400">Confidence</p>
            <div className={`mt-3 inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold ${confidenceStyles}`}>
              {forecast.confidenceLevel}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-800 bg-[#121212] p-6">
          <h3 className="text-lg font-semibold text-zinc-100">Procurement list</h3>
          {procurementList.length ? (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {procurementList.map((item) => (
                <div
                  key={`${item.item}-${item.quantity}`}
                  className="flex items-center justify-between rounded-xl border border-zinc-800/80 bg-[#0f0f0f] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">
                      {item.item}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {item.quantity} · {item.unit}
                    </p>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${getPriorityStyles(item.priority)}`}
                  >
                    {item.priority}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-zinc-500">
              Procurement list unavailable. Regenerate to fetch a fresh plan.
            </p>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-5">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-6 w-6 text-amber-300" />
            <div>
              <p className="text-sm font-semibold text-amber-200">Special advice</p>
              <p className="mt-1 text-sm text-amber-100/90">{adviceText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
