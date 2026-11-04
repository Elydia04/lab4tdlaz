import { useTodoStore } from '../store/useTodoStore'
import { getGroupAccent } from '../lib/groupAccents'
import { IconCheck, IconTrash } from './Icons'

export default function TaskItem({ task, groupName, groupAccent }) {
  const toggleTask = useTodoStore((state) => state.toggleTask)
  const deleteTask = useTodoStore((state) => state.deleteTask)
  const accent = getGroupAccent(groupAccent)

  function handleDelete() {
    if (!task.done) {
      const confirmed = window.confirm(
        `"${task.title}" is not marked as done yet. Delete it anyway?`,
      )
      if (!confirmed) return
    }
    deleteTask(task.id)
  }

  return (
    <li className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5 transition hover:border-slate-300 hover:shadow-sm">
      <button
        type="button"
        onClick={() => toggleTask(task.id)}
        aria-label={task.done ? 'Mark as not done' : 'Mark as done'}
        aria-pressed={task.done}
        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 transition ${
          task.done
            ? 'border-emerald-500 bg-emerald-500 text-white'
            : 'border-slate-300 text-transparent hover:border-emerald-400'
        }`}
      >
        <IconCheck className="h-3 w-3" strokeWidth={3} />
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={`text-sm leading-6 ${
            task.done ? 'text-slate-400 line-through' : 'text-slate-700'
          }`}
        >
          {task.title}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${
              task.done
                ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                : 'bg-slate-100 text-slate-600 ring-slate-200'
            }`}
          >
            {task.done ? 'Done' : 'Not done'}
          </span>
          {groupName && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600 ring-1 ring-inset ring-slate-200">
              <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
              {groupName}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={handleDelete}
        aria-label={`Delete task: ${task.title}`}
        className="rounded-lg p-1.5 text-rose-500 transition hover:bg-rose-50 hover:text-rose-600 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
      >
        <IconTrash className="h-4 w-4" />
      </button>
    </li>
  )
}
