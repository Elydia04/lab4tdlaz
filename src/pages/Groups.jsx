import { useState } from 'react'
import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'
import {
  IconArrowRight,
  IconFolder,
  IconPlus,
  IconTrash,
} from '../components/Icons'
import { getGroupAccent } from '../lib/groupAccents'
import { useTodoStore } from '../store/useTodoStore'

export default function Groups() {
  const groups = useTodoStore((state) => state.groups)
  const tasks = useTodoStore((state) => state.tasks)
  const addGroup = useTodoStore((state) => state.addGroup)
  const deleteGroup = useTodoStore((state) => state.deleteGroup)

  const [name, setName] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = name.trim()

    if (!trimmed) {
      setError('Give your group a name first.')
      return
    }

    const created = addGroup(trimmed)
    if (!created) {
      setError('A group with that name already exists.')
      return
    }

    setName('')
    setError('')
  }

  function handleDelete(group) {
    const count = tasks.filter((task) => task.groupId === group.id).length
    const message =
      count > 0
        ? `Delete "${group.name}" and its ${count} task${count === 1 ? '' : 's'}?`
        : `Delete "${group.name}"?`

    if (window.confirm(message)) deleteGroup(group.id)
  }

  return (
    <div>
      <PageHeader
        eyebrow="Task groups"
        title="Organize your tasks"
        description="Create categories such as School Activities, Personal Tasks, Projects, or Daily Tasks. Open a group to add tasks and track what is done."
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-700">
          Create a new group
        </h2>
        <form
          onSubmit={handleSubmit}
          className="mt-3 flex flex-col gap-2 sm:flex-row"
          noValidate
        >
          <label htmlFor="group-name" className="sr-only">
            Group name
          </label>
          <input
            id="group-name"
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value)
              if (error) setError('')
            }}
            placeholder="Example: School Activities"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <IconPlus className="h-4 w-4" strokeWidth={2.2} />
            Add
          </button>
        </form>

        {error && (
          <p role="alert" className="mt-2 text-sm text-rose-600">
            {error}
          </p>
        )}

        <p className="mt-2 text-xs text-slate-400">
          Groups are saved automatically in your browser.
        </p>
      </section>

      {groups.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon={<IconFolder className="h-6 w-6" />}
            title="No groups yet"
            description="Create your first group above, then open it to start adding tasks."
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => {
            const accent = getGroupAccent(group.accent)
            const groupTasks = tasks.filter((task) => task.groupId === group.id)
            const doneCount = groupTasks.filter((task) => task.done).length
            const pendingCount = groupTasks.length - doneCount
            const progress =
              groupTasks.length === 0
                ? 0
                : Math.round((doneCount / groupTasks.length) * 100)

            return (
              <article
                key={group.id}
                className={`relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${accent.hoverBorder}`}
              >
                <button
                  type="button"
                  onClick={() => handleDelete(group)}
                  aria-label={`Delete group: ${group.name}`}
                  className="absolute right-3 top-3 rounded-lg p-1.5 text-rose-400 transition hover:bg-rose-50 hover:text-rose-600"
                >
                  <IconTrash className="h-4 w-4" />
                </button>

                <Link to={`/groups/${group.id}`} className="block">
                  <div className="flex items-center gap-2 pr-8">
                    <span className={`h-3 w-3 shrink-0 rounded-full ${accent.dot}`} />
                    <h3 className="truncate font-semibold text-slate-900">
                      {group.name}
                    </h3>
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    {groupTasks.length} task{groupTasks.length === 1 ? '' : 's'} ·{' '}
                    {doneCount} done
                  </p>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${accent.bar} transition-all`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${accent.badge}`}
                    >
                      {pendingCount} pending
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600">
                      Open
                      <IconArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
