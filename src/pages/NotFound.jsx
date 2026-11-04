import { Link } from 'react-router-dom'
import { IconArrowLeft, IconHome } from '../components/Icons'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
        404
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
        Page not found
      </h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        The page you are looking for does not exist. It may have been moved, or
        the link may be incorrect.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <IconHome className="h-4 w-4" />
          Go to dashboard
        </Link>
        <Link
          to="/groups"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <IconArrowLeft className="h-4 w-4" />
          Task groups
        </Link>
      </div>
    </div>
  )
}
