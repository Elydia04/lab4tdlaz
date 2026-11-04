import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import TaskForm from '../components/TaskForm'
import TodoItem from '../components/TodoItem'
import { IconRefresh, IconTrash } from '../components/Icons'
import { useTodoStore } from '../store/useTodoStore'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Not done' },
  { key: 'done', label: 'Done' },
]

export default function TodoList() {
  const todos = useTodoStore((state) => state.todos)
  const addTodo = useTodoStore((state) => state.addTodo)
  const clearCompletedTodos = useTodoStore(
    (state) => state.clearCompletedTodos,
  )
  const clearTodos = useTodoStore((state) => state.clearTodos)
  const [filter, setFilter] = useState('all')

  const total = todos.length
  const completed = todos.filter((todo) => todo.done).length
  const pending = total - completed

  function handleClearAll() {
    const confirmed = window.confirm(
      `Clear all ${total} to-do${total === 1 ? '' : 's'}? This cannot be undone.`,
    )
    if (confirmed) clearTodos()
  }

  const sortedTodos = [...todos].sort((a, b) => b.createdAt - a.createdAt)
  const visibleTodos = sortedTodos.filter((todo) => {
    if (filter === 'done') return todo.done
    if (filter === 'active') return !todo.done
    return true
  })

  const filterCount = { all: total, active: pending, done: completed }

  return (
    <div>
      <PageHeader
        eyebrow="To-do list"
        title="My tasks"
        description="A simple to-do list that is not tied to any group. Every task here also appears on the dashboard."
        actions={
          total > 0 ? (
            <>
              {completed > 0 && (
                <button
                  type="button"
                  onClick={clearCompletedTodos}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  <IconRefresh className="h-4 w-4" />
                  Clear completed
                </button>
              )}
              <button
                type="button"
                onClick={handleClearAll}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
              >
                <IconTrash className="h-4 w-4 text-rose-500" />
                Clear all
              </button>
            </>
          ) : null
        }
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <TaskForm
          onAdd={addTodo}
          placeholder="Add a to-do..."
          buttonLabel="Add"
        />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div
            role="tablist"
            aria-label="Filter to-dos"
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
          <span className="text-xs text-slate-400">
            {total} task{total === 1 ? '' : 's'} · {pending} pending
          </span>
        </div>

        <div className="mt-3">
          {visibleTodos.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
              {filter === 'done'
                ? 'Nothing completed yet.'
                : filter === 'active'
                  ? 'Nothing pending — you are all caught up!'
                  : 'No to-dos yet. Add your first one above.'}
            </div>
          ) : (
            <ul className="space-y-2">
              {visibleTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </ul>
          )}
        </div>
      </section>

      <p className="mt-4 text-xs text-slate-400">
        These tasks have no group. Group tasks live on the Task Groups page.
      </p>
    </div>
  )
}
