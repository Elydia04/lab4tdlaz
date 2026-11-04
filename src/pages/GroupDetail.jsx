import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import TaskForm from '../components/TaskForm'
import TaskItem from '../components/TaskItem'
import {
  IconArrowLeft,
  IconCheckCircle,
  IconList,
  IconRefresh,
} from '../components/Icons'
import { getGroupAccent } from '../lib/groupAccents'
import { useTodoStore } from '../store/useTodoStore'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Not done' },
  { key: 'done', label: 'Done' },
]

export default function GroupDetail() {
  const { groupId } = useParams()
  const groups = useTodoStore((state) => state.groups)
  const tasks = useTodoStore((state) => state.tasks)
  const addTask = useTodoStore((state) => state.addTask)
  const clearCompleted = useTodoStore((state) => state.clearCompleted)
  const [filter, setFilter] = useState('all')

  const group = groups.find((item) => item.id === groupId)

  if (!group) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-slate-100 text-slate-400">
          <IconList className="h-7 w-7" />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
          Group not found
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          This group may have been deleted, or the link is incorrect.
        </p>
        <Link
          to="/groups"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <IconArrowLeft className="h-4 w-4" />
          Back to task groups
        </Link>
      </div>
    )
  }

  const accent = getGroupAccent(group.accent)
  const groupTasks = tasks.filter((task) => task.groupId === group.id)
  const doneCount = groupTasks.filter((task) => task.done).length
  const pendingCount = groupTasks.length - doneCount
  const progress =
    groupTasks.length === 0
      ? 0
      : Math.round((doneCount / groupTasks.length) * 100)

  const visibleTasks = groupTasks.filter((task) => {
    if (filter === 'done') return task.done
    if (filter === 'active') return !task.done
    return true
  })

  const filterCount = {
    all: groupTasks.length,
    active: pendingCount,
    done: doneCount,
  }

  return (
    <div>
      <Link
        to="/groups"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-800"
      >
        <IconArrowLeft className="h-4 w-4" />
        All task groups
      </Link>

      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <span className={`mt-2 h-3.5 w-3.5 shrink-0 rounded-full ${accent.dot}`} />
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {group.name}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {groupTasks.length} task{groupTasks.length === 1 ? '' : 's'} ·{' '}
                {doneCount} done · {pendingCount} pending
              </p>
            </div>
          </div>

          {doneCount > 0 && (
            <button
              type="button"
              onClick={() => clearCompleted(group.id)}
              className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <IconRefresh className="h-4 w-4" />
              Clear completed
            </button>
          )}
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full ${accent.bar} transition-all`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-slate-400">
          {progress}% of this group's tasks are complete.
        </p>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-700">
          Add a task to “{group.name}”
        </h2>
        <div className="mt-3">
          <TaskForm
            onAdd={(title) => addTask(group.id, title)}
            placeholder={`What needs to be done in ${group.name}?`}
            buttonLabel="Add"
          />
        </div>
      </section>

      <section className="mt-6">
        <div
          role="tablist"
          aria-label="Filter tasks"
          className="flex flex-wrap gap-2"
        >
          {filters.map(({ key, label }) => {
            const isActive = filter === key
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(key)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-50'
                }`}
              >
                {label} ({filterCount[key]})
              </button>
            )
          })}
        </div>

        <div className="mt-3">
          {visibleTasks.length === 0 ? (
            <EmptyState
              icon={<IconCheckCircle className="h-6 w-6" />}
              title={
                filter === 'done'
                  ? 'Nothing completed yet'
                  : filter === 'active'
                    ? 'Nothing left to do'
                    : 'No tasks in this group'
              }
              description={
                filter === 'done'
                  ? 'Mark a task as done and it will appear here.'
                  : filter === 'active'
                    ? 'Every task in this group is done. Nice work!'
                    : 'Use the form above to add the first task for this group.'
              }
            />
          ) : (
            <ul className="space-y-2">
              {visibleTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  )
}
