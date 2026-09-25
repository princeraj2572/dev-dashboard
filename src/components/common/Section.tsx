import type { ReactNode } from 'react'

interface SectionProps {
  title: string
  subtitle?: string
  children?: ReactNode
  action?: ReactNode
  className?: string
}

export const Section = ({ title, subtitle, children, action, className = '' }: SectionProps) => {
  return (
    <section className={className}>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold leading-snug">{title}</h2>
          {subtitle && <p className="text-sm text-subtle">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

export default Section
