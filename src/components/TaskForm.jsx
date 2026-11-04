import { useState } from 'react'
import { IconPlus } from './Icons'

export default function TaskForm({
  onAdd,
  placeholder = 'Add a new task...',
  buttonLabel = 'Add Task',
}) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = title.trim()

    if (!trimmed) {
      setError('Please type a task before adding it.')
      return
    }

    const created = onAdd(trimmed)
    if (created === null) {
      setError('That task could not be added. Please try again.')
      return
    }

    setTitle('')
    setError('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row" noValidate>
        <label htmlFor="task-title" className="sr-only">
          Task title
        </label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
            if (error) setError('')
          }}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <IconPlus className="h-4 w-4" strokeWidth={2.2} />
          {buttonLabel}
        </button>
      </form>
      {error && (
        <p role="alert" className="mt-2 text-sm text-rose-600">
          {error}
        </p>
      )}
    </div>
  )
}
