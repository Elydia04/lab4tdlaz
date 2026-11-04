import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTodoStore } from '../store/useTodoStore'
import { IconCheck, IconFolder, IconTrash } from './Icons'

export default function TodoItem({ todo }) {
  const groups = useTodoStore((state) => state.groups)
  const toggleTodo = useTodoStore((state) => state.toggleTodo)
  const deleteTodo = useTodoStore((state) => state.deleteTodo)
  const moveTodoToGroup = useTodoStore((state) => state.moveTodoToGroup)
  const groupMenuRef = useRef(null)

  function closeGroupMenu() {
    if (groupMenuRef.current) groupMenuRef.current.open = false
  }

  function handleMove(groupId) {
    moveTodoToGroup(todo.id, groupId)
    closeGroupMenu()
  }

  function handleDelete() {
    if (!todo.done) {
      const confirmed = window.confirm(
        `"${todo.title}" is not marked as done yet. Delete it anyway?`,
      )
      if (!confirmed) return
    }
    deleteTodo(todo.id)
  }

  return (
    <li className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5 transition hover:border-slate-300 hover:shadow-sm">
      <button
        type="button"
        onClick={() => toggleTodo(todo.id)}
        aria-label={todo.done ? 'Mark as not done' : 'Mark as done'}
        aria-pressed={todo.done}
        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 transition ${
          todo.done
            ? 'border-emerald-500 bg-emerald-500 text-white'
            : 'border-slate-300 text-transparent hover:border-emerald-400'
        }`}
      >
        <IconCheck className="h-3 w-3" strokeWidth={3} />
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={`text-sm leading-6 ${
            todo.done ? 'text-slate-400 line-through' : 'text-slate-700'
          }`}
        >
          {todo.title}
        </p>
        <div className="mt-1.5">
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${
              todo.done
                ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                : 'bg-slate-100 text-slate-600 ring-slate-200'
            }`}
          >
            {todo.done ? 'Done' : 'Not done'}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-0.5">
        <details ref={groupMenuRef} className="relative">
          <summary
            aria-label={`Add "${todo.title}" to a group`}
            title="Add to group"
            className="flex cursor-pointer list-none rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 [&::-webkit-details-marker]:hidden"
          >
            <IconFolder className="h-4 w-4" />
          </summary>

          <div className="absolute right-0 z-20 mt-1 w-56 rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
            <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Add to group
            </p>

            {groups.length === 0 ? (
              <p className="px-2 py-1.5 text-xs text-slate-500">
                No groups yet.{' '}
                <Link
                  to="/groups"
                  onClick={closeGroupMenu}
                  className="font-medium text-indigo-600 hover:underline"
                >
                  Create one
                </Link>
              </p>
            ) : (
              groups.map((group) => (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => handleMove(group.id)}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                  <span className="truncate">{group.name}</span>
                </button>
              ))
            )}

            <p className="mt-1 border-t border-slate-100 px-2 pt-1.5 text-[11px] text-slate-400">
              Moves it out of the to-do list.
            </p>
          </div>
        </details>

        <button
          type="button"
          onClick={handleDelete}
          aria-label={`Delete to-do: ${todo.title}`}
          className="rounded-lg p-1.5 text-rose-500 transition hover:bg-rose-50 hover:text-rose-600 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
        >
          <IconTrash className="h-4 w-4" />
        </button>
      </div>
    </li>
  )
}
