// One consistent accent for every group. Keeping a single style makes the
// interface calmer and keeps the palette to three colours:
// indigo (primary), emerald (done), slate (neutral).
const INDIGO = {
  dot: 'bg-indigo-500',
  bar: 'bg-indigo-500',
  soft: 'bg-indigo-50',
  text: 'text-indigo-600',
  badge: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  hoverBorder: 'hover:border-indigo-300',
}

export const GROUP_ACCENTS = {
  indigo: INDIGO,
}

export const ACCENT_KEYS = ['indigo']

export function getGroupAccent() {
  return INDIGO
}
