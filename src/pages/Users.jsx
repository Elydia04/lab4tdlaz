import { useState } from 'react'
import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import PageHeader from '../components/PageHeader'
import UserCard from '../components/UserCard'
import {
  IconArrowRight,
  IconBook,
  IconRefresh,
  IconSearch,
  IconUsers,
} from '../components/Icons'
import { useUsers } from '../hooks/useDummyUsers'

export default function Users() {
  const { users, loading, error, reload } = useUsers(12)
  const [query, setQuery] = useState('')

  const search = query.trim().toLowerCase()
  const filteredUsers = users.filter((user) => {
    const haystack = [
      user.firstName,
      user.lastName,
      user.username,
      user.email,
      user.company?.name,
      user.company?.title,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return haystack.includes(search)
  })

  return (
    <div>
      <PageHeader
        eyebrow="DummyJSON API"
        title="User information"
        description="Sample profiles retrieved from https://dummyjson.com/users with Axios. Use the search box to filter the results."
        actions={
          <button
            type="button"
            onClick={reload}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <IconRefresh
              className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}
            />
            Refresh
          </button>
        }
      />

      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <label htmlFor="user-search" className="sr-only">
            Search users
          </label>
          <input
            id="user-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, email, company..."
            className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <p className="text-sm text-slate-500">
          {loading
            ? 'Loading users...'
            : `Showing ${filteredUsers.length} of ${users.length} users`}
        </p>
      </div>

      <div aria-busy={loading}>
        {loading && (
          <LoadingState label="Fetching users from dummyjson.com..." />
        )}

        {!loading && error && (
          <ErrorState
            title="Could not load users"
            message={error}
            onRetry={reload}
          />
        )}

        {!loading && !error && filteredUsers.length === 0 && (
          <EmptyState
            icon={<IconUsers className="h-6 w-6" />}
            title={search ? 'No matching users' : 'No users returned'}
            description={
              search
                ? 'Try a different name, email address, or company.'
                : 'The API returned an empty list. Refresh to try again.'
            }
            action={
              search ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                >
                  Clear search
                </button>
              ) : null
            }
          />
        )}

        {!loading && !error && filteredUsers.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          Source:{' '}
          <a
            href="https://dummyjson.com/users"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-indigo-600 hover:underline"
          >
            dummyjson.com/users
          </a>
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/guide"
            className="inline-flex items-center gap-1 font-medium text-indigo-600 transition hover:text-indigo-700"
          >
            <IconBook className="h-4 w-4" />
            Read the user guide
          </Link>
          <Link
            to="/developers"
            className="inline-flex items-center gap-1 font-medium text-indigo-600 transition hover:text-indigo-700"
          >
            Meet the developers
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
