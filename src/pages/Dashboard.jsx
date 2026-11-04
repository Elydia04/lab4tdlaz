import { Link } from 'react-router-dom'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import StatCard from '../components/StatCard'
import TaskItem from '../components/TaskItem'
import {
  IconArrowRight,
  IconBook,
  IconCheckCircle,
  IconClock,
  IconFolder,
  IconList,
  IconRefresh,
  IconTrash,
} from '../components/Icons'
import { useUser } from '../hooks/useDummyUsers'
import { getFullName } from '../lib/format'
import { useTodoStore } from '../store/useTodoStore'
import UserAvatar from '../components/UserAvatar'

export default function Dashboard() {
  const groups = useTodoStore((state) => state.groups)
  const tasks = useTodoStore((state) => state.tasks)
  const clearCompleted = useTodoStore((state) => state.clearCompleted)
  const resetAll = useTodoStore((state) => state.resetAll)
  const { user, loading, error, reload } = useUser(1)

  const total = tasks.length
  const completed = tasks.filter((task) => task.done).length
  const pending = total - completed
  const completion = total === 0 ? 0 : Math.round((completed / total) * 100)
  const recentTasks = [...tasks]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5)

  const getGroup = (groupId) => groups.find((group) => group.id === groupId)

  function handleReset() {
    const confirmed = window.confirm(
      'Reset every group and task back to the sample data? This cannot be undone.',
    )
    if (confirmed) resetAll()
  }

  return (
    <div>
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500 px-6 py-10 text-white shadow-xl shadow-indigo-600/20 sm:px-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-fuchsia-300/20 blur-3xl" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/90 ring-1 ring-inset ring-white/20">
            TaskNest dashboard
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back 👋
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
            Keep your school work, personal errands, and projects in one place.
            Add tasks, tick them off, and switch between groups whenever you
            need a different view.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/groups"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50"
            >
              Open task groups
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/guide"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/40 transition hover:bg-white/10"
            >
              <IconBook className="h-4 w-4" />
              Read the user guide
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/75">
            You have <strong className="font-semibold text-white">{pending}</strong>{' '}
            pending task{pending === 1 ? '' : 's'} across{' '}
            <strong className="font-semibold text-white">{groups.length}</strong>{' '}
            group{groups.length === 1 ? '' : 's'}.
          </p>
        </div>
      </section>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total tasks"
          value={total}
          hint="Across every group"
          tone="indigo"
          icon={<IconList className="h-5 w-5" />}
        />
        <StatCard
          label="Completed"
          value={completed}
          hint={`${completion}% of all tasks`}
          tone="emerald"
          icon={<IconCheckCircle className="h-5 w-5" />}
        />
        <StatCard
          label="Pending"
          value={pending}
          hint="Still to be done"
          tone="amber"
          icon={<IconClock className="h-5 w-5" />}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-semibold text-slate-900">Recent tasks</h2>
            <Link
              to="/groups"
              className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
            >
              Manage groups
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {recentTasks.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
              <p className="text-sm text-slate-500">
                No tasks yet. Open a group and add your first task.
              </p>
              <Link
                to="/groups"
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <IconFolder className="h-4 w-4" />
                Go to task groups
              </Link>
            </div>
          ) : (
            <ul className="mt-4 space-y-2">
              {recentTasks.map((task) => {
                const group = getGroup(task.groupId)
                return (
                  <TaskItem
                    key={task.id}
                    task={task}
                    groupName={group?.name}
                    groupAccent={group?.accent}
                  />
                )
              })}
            </ul>
          )}
        </section>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-semibold text-slate-900">Sample user</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                DummyJSON
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Loaded with Axios from dummyjson.com
            </p>

            <div className="mt-4">
              {loading && <LoadingState compact label="Loading user..." />}

              {!loading && error && (
                <ErrorState
                  compact
                  title="User request failed"
                  message={error}
                  onRetry={reload}
                />
              )}

              {!loading && !error && user && (
                <div className="flex items-center gap-3">
                  <UserAvatar user={user} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {getFullName(user)}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      @{user.username}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {user.email}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/users"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
            >
              Browse all users
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-slate-900">Quick actions</h2>
            <p className="mt-1 text-xs text-slate-400">
              Changes are saved in your browser automatically.
            </p>

            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={() => clearCompleted()}
                disabled={completed === 0}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <IconRefresh className="h-4 w-4" />
                Clear completed tasks
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
              >
                <IconTrash className="h-4 w-4" />
                Reset sample data
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
