import type { ReactNode } from 'react'

export interface MetricItem {
  label: string
  value: string | number
  note?: string
  icon?: ReactNode
}

interface MetricStripProps {
  items: MetricItem[]
  className?: string
}

/**
 * A single ledger of numbers separated by hairlines, instead of a row of
 * identical cards. The gap-px trick draws the dividers at any column count.
 */
export const MetricStrip = ({ items, className = '' }: MetricStripProps) => {
  const cols = items.length >= 4 ? 'lg:grid-cols-4' : items.length === 3 ? 'lg:grid-cols-3' : ''
  return (
    <dl
      className={`grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line ${cols} ${className}`}
    >
      {items.map((item) => (
        <div key={item.label} className="bg-surface p-4 sm:p-5">
          <dt className="flex items-center justify-between gap-2 text-sm text-subtle">
            {item.label}
            {item.icon && <span aria-hidden="true">{item.icon}</span>}
          </dt>
          <dd className="font-display mt-1.5 text-3xl font-bold tabular-nums leading-none sm:text-4xl">
            {item.value}
          </dd>
          {item.note && <p className="mt-2 text-xs text-subtle">{item.note}</p>}
        </div>
      ))}
    </dl>
  )
}

export default MetricStrip
