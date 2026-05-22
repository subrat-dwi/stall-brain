import { CalendarDays, CloudSun, Users } from 'lucide-react'

function getImpactBadge(multiplier) {
  if (multiplier >= 1.2) {
    return { label: 'High Demand', color: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40' }
  }
  if (multiplier <= 0.9) {
    return { label: 'Low Demand', color: 'bg-rose-500/20 text-rose-200 border-rose-500/40' }
  }
  return { label: 'Normal', color: 'bg-amber-500/20 text-amber-200 border-amber-500/40' }
}

function getCardBorder(multiplier) {
  if (multiplier >= 1.2) {
    return 'border-emerald-500/40'
  }
  if (multiplier <= 0.9) {
    return 'border-rose-500/40'
  }
  return 'border-amber-500/40'
}

export default function SignalPanel({
  weather,
  weatherSignal,
  eventSummary,
  eventMultiplier,
  dayName,
  dayMultiplier,
  fallbackWeather,
  loading,
}) {
  if (loading) {
    return (
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-amber-100">
            Live demand signals
          </h2>
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Updating...
          </span>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="rounded-2xl border border-zinc-800 bg-[#1a1a1a] p-5"
            >
              <div className="space-y-4 animate-pulse">
                <div className="h-4 w-24 rounded bg-zinc-800" />
                <div className="h-8 w-20 rounded bg-zinc-800" />
                <div className="h-3 w-32 rounded bg-zinc-800" />
                <div className="h-3 w-40 rounded bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const safeWeather = weather ?? { temperature: 0 }
  const safeSignal = weatherSignal ?? {
    label: 'Weather Unknown',
    footfallImpact: 1,
    recommendation: 'Plan for regular demand.',
  }

  const weatherBadge = getImpactBadge(safeSignal.footfallImpact)
  const eventBadge = getImpactBadge(eventMultiplier)
  const dayBadge = getImpactBadge(dayMultiplier)
  const weatherBorder = getCardBorder(safeSignal.footfallImpact)
  const eventBorder = getCardBorder(eventMultiplier)
  const dayBorder = getCardBorder(dayMultiplier)

  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-amber-100">Live demand signals</h2>
        {fallbackWeather ? (
          <span className="text-xs text-amber-200/80">Using fallback weather</span>
        ) : null}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className={`rounded-2xl border ${weatherBorder} bg-[#1a1a1a] p-5`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <CloudSun size={18} className="text-amber-300" />
                Weather
              </div>
              <div className="mt-3 text-3xl font-semibold text-zinc-100">
                {Math.round(safeWeather.temperature)}°C
              </div>
              <div className="mt-2 text-sm text-zinc-400">
                {safeSignal.label}
              </div>
            </div>
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${weatherBadge.color}`}
            >
              {weatherBadge.label}
            </span>
          </div>
          <p className="mt-4 text-sm text-zinc-500">
            {safeSignal.recommendation}
          </p>
        </div>

        <div className={`rounded-2xl border ${eventBorder} bg-[#1a1a1a] p-5`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <CalendarDays size={18} className="text-amber-300" />
                Events
              </div>
              <div className="mt-3 text-lg font-semibold text-zinc-100">
                {eventSummary || 'Regular Day'}
              </div>
              <div className="mt-2 text-sm text-zinc-500">Lucknow calendar</div>
            </div>
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${eventBadge.color}`}
            >
              {eventBadge.label}
            </span>
          </div>
          <p className="mt-4 text-sm text-zinc-500">
            Event impact multiplier: {eventMultiplier.toFixed(2)}x
          </p>
        </div>

        <div className={`rounded-2xl border ${dayBorder} bg-[#1a1a1a] p-5`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Users size={18} className="text-amber-300" />
                {dayName}
              </div>
              <div className="mt-3 text-lg font-semibold text-zinc-100">
                Footfall Trend
              </div>
              <div className="mt-2 text-sm text-zinc-500">
                Weekly pattern for {dayName}
              </div>
            </div>
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${dayBadge.color}`}
            >
              {dayBadge.label}
            </span>
          </div>
          <p className="mt-4 text-sm text-zinc-500">
            Day-of-week multiplier: {dayMultiplier.toFixed(2)}x
          </p>
        </div>
      </div>
    </section>
  )
}
