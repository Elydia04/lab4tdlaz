import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ACCENT_KEYS } from '../lib/groupAccents'

const createId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export const SEED_GROUPS = [
  { id: 'school', name: 'School Activities', accent: 'indigo' },
  { id: 'personal', name: 'Personal Tasks', accent: 'emerald' },
  { id: 'projects', name: 'Projects', accent: 'amber' },
  { id: 'daily', name: 'Daily Tasks', accent: 'rose' },
]

const buildSeedTasks = () => {
  const now = Date.now()
  return [
    {
      id: 'seed-1',
      groupId: 'school',
      title: 'Finish the React to-do list project',
      done: false,
      createdAt: now - 1000 * 60 * 60 * 5,
    },
    {
      id: 'seed-2',
      groupId: 'school',
      title: 'Review React Router DOM notes',
      done: true,
      createdAt: now - 1000 * 60 * 60 * 8,
    },
    {
      id: 'seed-3',
      groupId: 'personal',
      title: 'Buy groceries for the week',
      done: false,
      createdAt: now - 1000 * 60 * 60 * 20,
    },
    {
      id: 'seed-4',
      groupId: 'projects',
      title: 'Connect Axios to the DummyJSON API',
      done: true,
      createdAt: now - 1000 * 60 * 60 * 26,
    },
    {
      id: 'seed-5',
      groupId: 'daily',
      title: '30 minutes of exercise',
      done: false,
      createdAt: now - 1000 * 60 * 60 * 30,
    },
  ]
}

/**
 * Global task + group state shared by every page.
 *
 * `persist` saves `groups` and `tasks` to localStorage, so the data is still
 * there after a page refresh or after closing the browser tab.
 */
export const useTodoStore = create(
  persist(
    (set, get) => ({
      groups: [...SEED_GROUPS],
      tasks: buildSeedTasks(),

      addGroup: (name) => {
        const trimmed = name.trim()
        if (!trimmed) return null

        const { groups } = get()
        const exists = groups.some(
          (group) => group.name.toLowerCase() === trimmed.toLowerCase(),
        )
        if (exists) return null

        const group = {
          id: createId(),
          name: trimmed,
          accent: ACCENT_KEYS[groups.length % ACCENT_KEYS.length],
        }
        set({ groups: [...groups, group] })
        return group
      },

      deleteGroup: (groupId) =>
        set((state) => ({
          groups: state.groups.filter((group) => group.id !== groupId),
          tasks: state.tasks.filter((task) => task.groupId !== groupId),
        })),

      addTask: (groupId, title) => {
        const trimmed = title.trim()
        if (!trimmed) return null

        const { groups } = get()
        if (!groups.some((group) => group.id === groupId)) return null

        const task = {
          id: createId(),
          groupId,
          title: trimmed,
          done: false,
          createdAt: Date.now(),
        }
        set((state) => ({ tasks: [task, ...state.tasks] }))
        return task
      },

      toggleTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, done: !task.done } : task,
          ),
        })),

      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),

      // Pass a groupId to clear only that group, or nothing to clear everything.
      clearCompleted: (groupId) =>
        set((state) => ({
          tasks: state.tasks.filter(
            (task) => !(task.done && (!groupId || task.groupId === groupId)),
          ),
        })),

      resetAll: () => set({ groups: [...SEED_GROUPS], tasks: buildSeedTasks() }),
    }),
    {
      name: 'tasknest-store',
      version: 1,
      // Only tasks and groups are persisted. The action functions always come
      // from the store definition above.
      partialize: (state) => ({ groups: state.groups, tasks: state.tasks }),
    },
  ),
)
