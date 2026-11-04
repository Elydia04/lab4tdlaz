export default function LoadingState({ label = 'Loading...', compact = false }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={
        compact
          ? 'flex items-center gap-3 py-2 text-sm text-slate-500'
          : 'flex items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-white py-12 text-sm text-slate-500'
      }
    >
      <span
        aria-hidden="true"
        className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600"
      />
      <span>{label}</span>
    </div>
  )
}
