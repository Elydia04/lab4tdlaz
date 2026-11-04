import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  IconBook,
  IconClose,
  IconCode,
  IconFolder,
  IconHome,
  IconList,
  IconMenu,
  IconUsers,
} from './Icons'

const links = [
  { to: '/', label: 'Dashboard', icon: IconHome, end: true },
  { to: '/tasks', label: 'To-Do List', icon: IconList },
  { to: '/groups', label: 'Task Groups', icon: IconFolder },
  { to: '/guide', label: 'User Guide', icon: IconBook },
  { to: '/users', label: 'Users', icon: IconUsers },
  { to: '/developers', label: 'Developers', icon: IconCode },
]

const desktopLinkClass = ({ isActive }) =>
  `inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-indigo-50 text-indigo-700'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`

const mobileLinkClass = ({ isActive }) =>
  `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
    isActive
      ? 'bg-indigo-50 text-indigo-700'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
      >
        <Link to="/" className="leading-tight">
          <span className="block text-lg font-bold tracking-tight text-slate-900">
            TDLAZ
          </span>
          <span className="block text-[11px] font-medium text-slate-500">
            To-Do List
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={desktopLinkClass}>
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className={`rounded-lg p-2 transition lg:hidden ${
            open
              ? 'text-rose-500 hover:bg-rose-50 hover:text-rose-600'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? (
            <IconClose className="h-5 w-5" />
          ) : (
            <IconMenu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 pb-3 pt-2 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={mobileLinkClass}
                onClick={() => setOpen(false)}
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
