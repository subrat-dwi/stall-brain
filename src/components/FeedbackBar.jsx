import { ThumbsDown, ThumbsUp } from 'lucide-react'

export default function FeedbackBar({ feedback, onFeedback }) {
  if (feedback) {
    return (
      <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-100">
        Thanks for the feedback! We&apos;ll improve tomorrow&apos;s forecast.
      </div>
    )
  }

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-[#141414] px-5 py-4">
      <p className="text-sm text-zinc-300">Was this forecast accurate?</p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onFeedback('up')}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:border-emerald-400"
        >
          <ThumbsUp size={16} />
          Yes
        </button>
        <button
          type="button"
          onClick={() => onFeedback('down')}
          className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:border-rose-400"
        >
          <ThumbsDown size={16} />
          No
        </button>
      </div>
    </div>
  )
}
