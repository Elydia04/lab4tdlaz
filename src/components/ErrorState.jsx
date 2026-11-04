import { IconAlert, IconRefresh } from './Icons'

export default function ErrorState({
  title = 'Could not load the data',
  message,
  onRetry,
  compact = false,
}) {
  return (
    <div
      role="alert"
      className={`rounded-xl border border-rose-200 bg-rose-50 text-rose-800 ${
        compact ? 'p-3' : 'p-5'
      }`}
    >
      <div className="flex items-start gap-3">
        <IconAlert className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">{title}</p>
          {message && <p className="mt-1 text-sm text-rose-700">{message}</p>}
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-700"
            >
              <IconRefresh className="h-3.5 w-3.5" />
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
