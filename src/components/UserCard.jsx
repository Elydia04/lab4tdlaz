import { getFullName } from '../lib/format'
import { IconMail, IconUser } from './Icons'
import UserAvatar from './UserAvatar'

export default function UserCard({ user }) {
  const name = getFullName(user)

  return (
    <article className="min-w-0 max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center gap-4">
        <UserAvatar user={user} size="md" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-slate-900">{name}</h3>
          <p className="truncate text-sm text-slate-500">@{user.username}</p>
        </div>
      </div>

      <dl className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm">
        <div className="flex items-center gap-2 text-slate-600">
          <IconMail className="h-4 w-4 shrink-0 text-slate-400" />
          <span className="truncate min-w-0 break-words">{user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600 min-w-0">
          <IconUser className="h-4 w-4 shrink-0 text-slate-400" />
          <span className="truncate min-w-0 break-words">
            {user.company?.title ?? 'Member'}
            {user.company?.name ? ` · ${user.company.name}` : ''}
          </span>
        </div>
      </dl>

      <p className="mt-3 text-xs text-slate-400">
        Age {user.age} · {user.gender}
      </p>
    </article>
  )
}
