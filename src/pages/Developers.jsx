import { Link } from 'react-router-dom'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import PageHeader from '../components/PageHeader'
import {
  IconArrowRight,
  IconCode,
  IconMail,
  IconRefresh,
  IconUsers,
} from '../components/Icons'
import { team } from '../data/team'
import { useUser } from '../hooks/useDummyUsers'
import { getFullName, getInitials } from '../lib/format'
import UserAvatar from '../components/UserAvatar'

const techStack = [
  'React',
  'Tailwind CSS',
  'Zustand',
  'Axios',
  'React Router DOM',
  'DummyJSON API',
]

export default function Developers() {
  const { user, loading, error, reload } = useUser(2)

  return (
    <div>
      <PageHeader
        eyebrow="The team"
        title="Developers"
        description="The people behind TDLAZ, plus a live developer profile loaded from the DummyJSON API."
      />

      <section>
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-slate-500">
          <IconUsers className="h-4 w-4" />
          Group members
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <article
              key={member.name}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 ring-1 ring-inset ring-indigo-200">
                  {getInitials(member.name)}
                </span>
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-slate-900">
                    {member.name}
                  </h3>
                  <p className="truncate text-sm text-slate-500">{member.role}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                {member.focus}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-slate-900">
              Developer profile from DummyJSON
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              This card is fetched with Axios and shows a loading state, an error
              state, and a retry button.
            </p>
          </div>
          <button
            type="button"
            onClick={reload}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <IconRefresh
              className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}
            />
            Reload
          </button>
        </div>

        <div className="mt-4">
          {loading && (
            <LoadingState compact label="Loading developer profile..." />
          )}

          {!loading && error && (
            <ErrorState
              compact
              title="Could not load the profile"
              message={error}
              onRetry={reload}
            />
          )}

          {!loading && !error && user && (
            <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center">
              <UserAvatar user={user} size="lg" />
              <div className="min-w-0">
                <p className="font-semibold text-slate-900">
                  {getFullName(user)}
                </p>
                <p className="text-sm text-slate-500">@{user.username}</p>
                <p className="mt-1 inline-flex items-center gap-2 text-sm text-slate-600">
                  <IconMail className="h-4 w-4 text-slate-400" />
                  {user.email}
                </p>
              </div>
              <Link
                to="/users"
                className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 transition hover:text-indigo-700 sm:ml-auto"
              >
                All users
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="flex items-center gap-2 font-semibold text-slate-900">
          <IconCode className="h-5 w-5 text-indigo-600" />
          Built with
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          Back to dashboard
          <IconArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/groups"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Open task groups
        </Link>
      </div>
    </div>
  )
}
