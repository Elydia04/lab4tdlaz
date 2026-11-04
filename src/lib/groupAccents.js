// Every class name is written out in full so Tailwind can detect it while
// scanning the source files. Avoid building class names dynamically.
export const GROUP_ACCENTS = {
  indigo: {
    dot: 'bg-indigo-500',
    bar: 'bg-indigo-500',
    soft: 'bg-indigo-50',
    text: 'text-indigo-600',
    badge: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
    hoverBorder: 'hover:border-indigo-300',
  },
  emerald: {
    dot: 'bg-emerald-500',
    bar: 'bg-emerald-500',
    soft: 'bg-emerald-50',
    text: 'text-emerald-600',
    badge: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    hoverBorder: 'hover:border-emerald-300',
  },
  amber: {
    dot: 'bg-amber-500',
    bar: 'bg-amber-500',
    soft: 'bg-amber-50',
    text: 'text-amber-600',
    badge: 'bg-amber-50 text-amber-700 ring-amber-200',
    hoverBorder: 'hover:border-amber-300',
  },
  rose: {
    dot: 'bg-rose-500',
    bar: 'bg-rose-500',
    soft: 'bg-rose-50',
    text: 'text-rose-600',
    badge: 'bg-rose-50 text-rose-700 ring-rose-200',
    hoverBorder: 'hover:border-rose-300',
  },
  sky: {
    dot: 'bg-sky-500',
    bar: 'bg-sky-500',
    soft: 'bg-sky-50',
    text: 'text-sky-600',
    badge: 'bg-sky-50 text-sky-700 ring-sky-200',
    hoverBorder: 'hover:border-sky-300',
  },
  violet: {
    dot: 'bg-violet-500',
    bar: 'bg-violet-500',
    soft: 'bg-violet-50',
    text: 'text-violet-600',
    badge: 'bg-violet-50 text-violet-700 ring-violet-200',
    hoverBorder: 'hover:border-violet-300',
  },
}

export const ACCENT_KEYS = Object.keys(GROUP_ACCENTS)

export function getGroupAccent(accent) {
  return GROUP_ACCENTS[accent] ?? GROUP_ACCENTS.indigo
}
