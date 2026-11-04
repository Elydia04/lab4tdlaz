import { Link } from 'react-router-dom'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import StatCard from '../components/StatCard'
import TaskItem from '../components/TaskItem'
import TodoItem from '../components/TodoItem'
import UserAvatar from '../components/UserAvatar'
import {
  IconArrowRight,
  IconCheckCircle,
  IconClock,
  IconFolder,
  IconList,
} from '../components/Icons'
import { useUser } from '../hooks/useDummyUsers'
import { getFullName } from '../lib/format'
import { useTodoStore } from '../store/useTodoStore'

export default function Dashboard() {
  const groups = useTodoStore((state) => state.groups)
  const tasks = useTodoStore((state) => state.tasks)
  const todos = useTodoStore((state) => state.todos)
  const { user, loading, error, reload } = useUser(1)

  const total = tasks.length + todos.length
  const completed =
    tasks.filter((task) => task.done).length +
    todos.filter((todo) => todo.done).length
  const pending = total - completed
  const completion = total === 0 ? 0 : Math.round((completed / total) * 100)

  const groupById = new Map(groups.map((group) => [group.id, group]))

  // Everything in one list: standalone to-dos (no group) and group tasks
  // (with the group name shown as a badge).
  const overview = [
    ...todos.map((todo) => ({
      key: `todo-${todo.id}`,
      type: 'todo',
      createdAt: todo.createdAt,
      todo,
    })),
    ...tasks.map((task) => ({
      key: `task-${task.id}`,
      type: 'task',
      createdAt: task.createdAt,
      task,
      group: groupById.get(task.groupId),
    })),
  ].sort((a, b) => b.createdAt - a.createdAt)

  return (
    <div>
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-50 blur-2xl" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-indigo-700 ring-1 ring-inset ring-indigo-100">
            TDLAZ dashboard
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Welcome back 👋
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            One overview of everything on your list — your to-dos and all of your
            group tasks together. Tick them off or delete them here, and add new
            ones from the To-Do List or Task Groups pages.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/tasks"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              Open to-do list
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/groups"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <IconFolder className="h-4 w-4" />
              Task groups
            </Link>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            You have <strong className="font-semibold text-slate-900">{pending}</strong>{' '}
            pending task{pending === 1 ? '' : 's'} across{' '}
            <strong className="font-semibold text-slate-900">{groups.length}</strong>{' '}
            group{groups.length === 1 ? '' : 's'} and your to-do list.
          </p>
        </div>
      </section>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total tasks"
          value={total}
          hint="To-dos + group tasks"
          tone="indigo"
          icon={<IconList className="h-5 w-5" />}
        />
        <StatCard
          label="Completed"
          value={completed}
          hint={`${completion}% of everything`}
          tone="emerald"
          icon={<IconCheckCircle className="h-5 w-5" />}
        />
        <StatCard
          label="Pending"
          value={pending}
          hint="Still to be done"
          tone="slate"
          icon={<IconClock className="h-5 w-5" />}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-semibold text-slate-900">All tasks</h2>
              <p className="mt-0.5 text-xs text-slate-400">
                Tick tasks off or delete them here. Group tasks show their group.
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
              {total} task{total === 1 ? '' : 's'}
            </span>
          </div>

          <div className="mt-4">
            {overview.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
                Nothing here yet. Add to-dos on the{' '}
                <Link
                  to="/tasks"
                  className="font-medium text-indigo-600 hover:underline"
                >
                  To-Do List
                </Link>{' '}
                page or tasks inside a{' '}
                <Link
                  to="/groups"
                  className="font-medium text-indigo-600 hover:underline"
                >
                  task group
                </Link>
                .
              </div>
            ) : (
              <ul className="space-y-2">
                {overview.map((item) =>
                  item.type === 'todo' ? (
                    <TodoItem key={item.key} todo={item.todo} />
                  ) : (
                    <TaskItem
                      key={item.key}
                      task={item.task}
                      groupName={item.group?.name}
                      groupAccent={item.group?.accent}
                    />
                  ),
                )}
              </ul>
            )}
          </div>
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
            <h2 className="font-semibold text-slate-900">Manage your tasks</h2>
            <p className="mt-1 text-xs text-slate-400">
              Add new tasks on the pages below. You can tick off and delete tasks
              straight from the list.
            </p>

            <div className="mt-4 space-y-2">
              <Link
                to="/tasks"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                <IconList className="h-4 w-4" />
                To-Do List
              </Link>
              <Link
                to="/groups"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <IconFolder className="h-4 w-4" />
                Task Groups
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
