import { useState } from 'react'
import { getFullName, getInitials } from '../lib/format'

const sizeClasses = {
  sm: 'h-12 w-12 text-sm',
  md: 'h-14 w-14 text-base',
  lg: 'h-16 w-16 text-lg',
}

/**
 * Shows the DummyJSON profile picture, and automatically falls back to the
 * user's initials when the image is missing or fails to load (for example when
 * offline or when dummyjson.com is blocked).
 */
export default function UserAvatar({ user, size = 'md' }) {
  const [failedSrc, setFailedSrc] = useState(null)
  const name = getFullName(user)
  const sizeClass = sizeClasses[size] ?? sizeClasses.md
  const showFallback = !user?.image || failedSrc === user.image

  if (showFallback) {
    return (
      <span
        role="img"
        aria-label={name}
        className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 font-bold text-white ${sizeClass}`}
      >
        {getInitials(name)}
      </span>
    )
  }

  return (
    <img
      src={user.image}
      alt={name}
      loading="lazy"
      decoding="async"
      onError={() => setFailedSrc(user.image)}
      className={`shrink-0 rounded-full bg-slate-100 object-cover ring-2 ring-slate-100 ${sizeClass}`}
    />
  )
}
