import { useEffect, useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'

const steps = [
  '📡 Fetching Lucknow weather data...',
  '📅 Checking local events calendar...',
  '📊 Analyzing footfall patterns...',
  '🧠 AI is calculating your forecast...',
  '✅ Forecast ready!',
]

export default function LoadingState({ active }) {
  const [activeIndex, setActiveIndex] = useState(-1)

  useEffect(() => {
    if (!active) {
      setActiveIndex(-1)
      return
    }

    setActiveIndex(0)
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev >= steps.length) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 600)

    return () => clearInterval(interval)
  }, [active])

  return (
    <div className="mt-8 rounded-2xl border border-zinc-800 bg-[#151515] p-6">
      <h3 className="text-lg font-semibold text-amber-100">
        Bazaar Brain is working...
      </h3>
      <div className="mt-4 space-y-3">
        {steps.map((step, index) => {
          const isVisible = index <= activeIndex
          if (!isVisible) return null

          const isActive = index === activeIndex && activeIndex < steps.length
          const isDone = index < activeIndex || activeIndex >= steps.length

          return (
            <div
              key={step}
              className="flex items-center gap-3 rounded-xl border border-zinc-800/80 bg-[#101010] px-4 py-3"
            >
              {isActive ? (
                <Loader2 className="h-5 w-5 animate-spin text-amber-300" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              )}
              <span className={`text-sm ${isDone ? 'text-zinc-200' : 'text-zinc-400'}`}>
                {step}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
