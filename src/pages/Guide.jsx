import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import {
  IconArrowRight,
  IconBook,
  IconCode,
  IconFolder,
  IconUsers,
} from '../components/Icons'

function Step({ step, title, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-indigo-50 text-sm font-bold text-indigo-600">
          {step}
        </span>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <div className="mt-2 space-y-3 text-sm leading-6 text-slate-600">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

function CodeBlock({ children }) {
  return (
    <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs leading-6 text-slate-100">
      <code>{children}</code>
    </pre>
  )
}

const quickLinks = [
  {
    to: '/groups',
    label: 'Task Groups',
    description: 'Create categories and open a group to manage its tasks.',
    icon: IconFolder,
  },
  {
    to: '/users',
    label: 'User Information',
    description: 'Browse sample users loaded from the DummyJSON API.',
    icon: IconUsers,
  },
  {
    to: '/developers',
    label: 'Developers',
    description: 'See the group members and the API-powered profile.',
    icon: IconCode,
  },
]

export default function Guide() {
  return (
    <div>
      <PageHeader
        eyebrow="Instructions"
        title="User guide"
        description="A quick walkthrough of every feature in TaskNest — groups, tasks, navigation, the DummyJSON API, and Zustand."
      />

      <div className="space-y-4">
        <Step step={1} title="Create a task group">
          <p>
            Open the{' '}
            <Link
              to="/groups"
              className="font-medium text-indigo-600 hover:underline"
            >
              Task Groups
            </Link>{' '}
            page. Type a name in the “Create a new group” field and click the{' '}
            <strong>Add group</strong> button.
          </p>
          <p>
            Good examples are <em>School Activities</em>, <em>Personal Tasks</em>,{' '}
            <em>Projects</em>, and <em>Daily Tasks</em>. Duplicate names are not
            allowed, and blank names are ignored.
          </p>
        </Step>

        <Step step={2} title="Add a task to a selected group">
          <p>
            On the Task Groups page, click <strong>Open</strong> on a group card
            (or open the group link directly). Type the task in the input at the
            top of the group page and click <strong>Add Task</strong>.
          </p>
          <p>
            The task is stored with that group's ID, so it only appears inside
            the group you chose. New tasks start with the status{' '}
            <strong>Not done</strong>.
          </p>
        </Step>

        <Step step={3} title="Mark a task as Done or Not Done">
          <p>
            Click the square checkbox on the left of any task to toggle it. A
            checked task turns green, gets a strikethrough, and changes its badge
            from <strong>Not done</strong> to <strong>Done</strong>.
          </p>
          <p>
            Click it again to return the task to <strong>Not done</strong>. The
            dashboard counters update immediately because the data lives in the
            shared Zustand store.
          </p>
        </Step>

        <Step step={4} title="Delete a task or clear tasks">
          <p>
            Hover a task and click the trash icon on the right to delete it. On a
            group page you can also use <strong>Clear completed</strong> to remove
            every finished task in that group.
          </p>
          <p>
            On the dashboard, <strong>Clear completed tasks</strong> removes done
            tasks from every group, and <strong>Reset sample data</strong> puts
            the demo groups and tasks back.
          </p>
        </Step>

        <Step step={5} title="Move between pages and groups">
          <p>
            Use the navigation bar to switch between Dashboard, Task Groups, User
            Guide, Users, and Developers. On mobile, tap the menu button to open
            the same links.
          </p>
          <p>
            From a group page, the <strong>All task groups</strong> link returns
            you to the groups list. The route{' '}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-700">
              /groups/:groupId
            </code>{' '}
            uses a dynamic URL parameter to decide which group to display.
          </p>
        </Step>

        <Step step={6} title="Retrieve user information with Axios">
          <p>
            The Users page and the dashboard user card call the DummyJSON API
            through a shared Axios instance:
          </p>
          <CodeBlock>{`import axios from 'axios'

const { data } = await axios.get('https://dummyjson.com/users?limit=12')
setUsers(data.users)`}</CodeBlock>
          <p>
            The request lives in{' '}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-700">
              src/api/dummyApi.js
            </code>{' '}
            and is wrapped in custom hooks. While the request is running, a
            spinner is shown. If it fails, an error card appears with a{' '}
            <strong>Try again</strong> button.
          </p>
        </Step>

        <Step step={7} title="How Zustand shares task data">
          <p>
            All task and group data is kept in one Zustand store at{' '}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-700">
              src/store/useTodoStore.js
            </code>
            . Components read only what they need:
          </p>
          <CodeBlock>{`const tasks = useTodoStore((state) => state.tasks)
const addTask = useTodoStore((state) => state.addTask)`}</CodeBlock>
          <p>
            When a task is added, toggled, or deleted, every component using the
            store re-renders with the new data. That is why the dashboard counts,
            group cards, and group task lists always stay in sync.
          </p>
        </Step>

        <Step step={8} title="Your data survives a refresh">
          <p>
            The store uses Zustand's <strong>persist</strong> middleware, which
            saves groups and tasks to <strong>localStorage</strong>. Refreshing the
            page, opening a route directly, or closing and reopening the browser
            keeps your data.
          </p>
          <CodeBlock>{`persist(storeDefinition, {
  name: 'tasknest-store',
  partialize: (state) => ({ groups: state.groups, tasks: state.tasks }),
})`}</CodeBlock>
          <p>
            Use <strong>Reset sample data</strong> on the dashboard whenever you
            want a clean start.
          </p>
        </Step>
      </div>

      <section className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 sm:p-6">
        <div className="flex items-center gap-2 text-indigo-700">
          <IconBook className="h-5 w-5" />
          <h2 className="font-semibold">Where to go next</h2>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {quickLinks.map(({ to, label, description, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="group rounded-xl border border-indigo-100 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-indigo-50 text-indigo-600">
                <Icon className="h-4 w-4" />
              </span>
              <p className="mt-2 flex items-center gap-1 text-sm font-semibold text-slate-900">
                {label}
                <IconArrowRight className="h-3.5 w-3.5 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-indigo-600" />
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
