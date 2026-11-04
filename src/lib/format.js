export function getFullName(user) {
  if (!user) return 'Unknown user'
  const name = [user.firstName, user.lastName].filter(Boolean).join(' ').trim()
  return name || user.username || 'Unknown user'
}

export function getInitials(name = '') {
  return (
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('') || '?'
  )
}
