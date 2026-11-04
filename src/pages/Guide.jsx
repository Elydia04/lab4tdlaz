import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import {
  IconArrowRight,
  IconBook,
  IconCode,
  IconFolder,
  IconList,
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

const quickLinks = [
  {
    to: '/tasks',
    label: 'To-Do List',
    description: 'Everyday tasks that are not tied to a group.',
    icon: IconList,
  },
  {
    to: '/groups',
    label: 'Task Groups',
    description: 'Organize tasks into categories you choose.',
    icon: IconFolder,
  },
  {
    to: '/users',
    label: 'User Information',
    description: 'Browse sample user profiles.',
    icon: IconUsers,
  },
  {
    to: '/developers',
    label: 'Developers',
    description: 'Meet the team behind TDLAZ.',
    icon: IconCode,
  },
]

export default function Guide() {
  return (
    <div>
      <PageHeader
        eyebrow="Instructions"
        title="User guide"
        description="Everything you need to use TDLAZ — adding tasks, organizing groups, and keeping track of what is done."
      />

      <div className="space-y-4">
        <Step step={1} title="Start on the dashboard">
          <p>
            The dashboard is your overview. It shows every task you have in one
            list: your standalone to-dos and the tasks inside your groups. Group
            tasks show a small group badge; to-dos do not.
          </p>
          <p>
            From here you can add a standalone to-do, tick a task off, delete it,
            or jump to the{' '}
            <Link
              to="/tasks"
              className="font-medium text-indigo-600 hover:underline"
            >
              To-Do List
            </Link>{' '}
            and{' '}
            <Link
              to="/groups"
              className="font-medium text-indigo-600 hover:underline"
            >
              Task Groups
            </Link>{' '}
            pages for the full lists.
          </p>
        </Step>

        <Step step={2} title="Add a to-do">
          <p>
            Open the{' '}
            <Link
              to="/tasks"
              className="font-medium text-indigo-600 hover:underline"
            >
              To-Do List
            </Link>{' '}
            page, type in the input, and click <strong>Add</strong>. These tasks
            are not tied to any group and never show a group badge. You can also
            add a to-do right from the dashboard.
          </p>
          <p>
            Already added a to-do? Click the folder icon on it and pick a group.
            It moves out of the to-do list and becomes a task inside that group.
          </p>
        </Step>

        <Step step={3} title="Create a task group">
          <p>
            Open the{' '}
            <Link
              to="/groups"
              className="font-medium text-indigo-600 hover:underline"
            >
              Task Groups
            </Link>{' '}
            page. Type a name in the “Create a new group” field and click{' '}
            <strong>Add group</strong>.
          </p>
          <p>
            Good examples are <em>School Activities</em>, <em>Personal Tasks</em>,{' '}
            <em>Projects</em>, and <em>Daily Tasks</em>. Duplicate names are not
            allowed, and blank names are ignored.
          </p>
        </Step>

        <Step step={4} title="Add tasks to a group">
          <p>
            On the Task Groups page, click <strong>Open</strong> on a group card.
            Type the task at the top of the group page and click{' '}
            <strong>Add</strong>. The task only appears inside that group.
          </p>
          <p>
            You can also add several groups and keep related tasks together, such
            as school work in one group and personal errands in another.
          </p>
        </Step>

        <Step step={5} title="Mark a task as done">
          <p>
            Click the square checkbox on the left of any task to toggle it. A
            checked task turns green, gets a strikethrough, and changes its badge
            from <strong>Not done</strong> to <strong>Done</strong>.
          </p>
          <p>
            Click it again to return the task to <strong>Not done</strong>. You
            can do this from the dashboard, the To-Do List, or any group page.
          </p>
        </Step>

        <Step step={6} title="Delete or clear tasks">
          <p>
            Hover a task and click the trash icon to delete it. If the task is not
            marked as done yet, a confirmation box appears first so you do not
            remove something you still need to finish. Done tasks are deleted
            straight away.
          </p>
          <p>
            On the To-Do List page you can also use{' '}
            <strong>Clear completed</strong> to remove finished to-dos, or{' '}
            <strong>Clear all</strong> to empty the whole list (it asks first). On
            a group page, <strong>Clear completed</strong> removes every finished
            task in that group.
          </p>
        </Step>

        <Step step={7} title="Browse users and developers">
          <p>
            The{' '}
            <Link
              to="/users"
              className="font-medium text-indigo-600 hover:underline"
            >
              Users
            </Link>{' '}
            page shows sample user profiles. Select a user to see more details.
            While the profiles are loading, a spinner is shown. If something goes
            wrong, a message appears with a <strong>Try again</strong> button.
          </p>
          <p>
            The{' '}
            <Link
              to="/developers"
              className="font-medium text-indigo-600 hover:underline"
            >
              Developers
            </Link>{' '}
            page shows the team behind TDLAZ.
          </p>
        </Step>

        <Step step={8} title="Your tasks are saved automatically">
          <p>
            Anything you add, tick off, or delete is saved in your browser. You
            can refresh the page, open a link directly, or close the tab and come
            back later — your tasks will still be there.
          </p>
          <p>
            If you clear this site's browser data, your tasks are removed and the
            sample content comes back the next time you open the app.
          </p>
        </Step>

        <Step step={9} title="Move around the app">
          <p>
            Use the navigation bar to switch between Dashboard, To-Do List, Task
            Groups, User Guide, Users, and Developers. On mobile, tap the menu
            button to open the same links.
          </p>
          <p>
            From a group page, the <strong>All task groups</strong> link takes you
            back to the groups list.
          </p>
        </Step>

        <Step step={10} title="How user information is loaded">
          <p>
            The Users page and the dashboard get their sample profiles from
            DummyJSON at <em>dummyjson.com</em>, a free sample API. The app sends
            the request with <strong>Axios</strong>.
          </p>
          <p>
            While the request is running, a loading spinner is shown. If the
            request fails, a red message appears with a <strong>Try again</strong>{' '}
            button. Open the Users page and use <strong>Refresh</strong> to send
            the request again.
          </p>
        </Step>

        <Step step={11} title="How task data stays in sync">
          <p>
            All tasks, groups, and to-dos are kept in one shared{' '}
            <strong>Zustand</strong> store. When you add, tick, delete, or move a
            task, the store updates and every page that uses that data re-renders.
          </p>
          <p>
            That is why the dashboard counters, group cards, and task lists always
            match. The store is also saved in your browser, so your data survives
            a page refresh.
          </p>
        </Step>
      </div>

      <section className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 sm:p-6">
        <div className="flex items-center gap-2 text-indigo-700">
          <IconBook className="h-5 w-5" />
          <h2 className="font-semibold">Where to go next</h2>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
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
