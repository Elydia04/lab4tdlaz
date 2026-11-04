export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      {icon && (
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-slate-50 text-slate-400">
          {icon}
        </div>
      )}
      <h3 className="mt-3 font-semibold text-slate-800">{title}</h3>
      {description && (
        <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  )
}
