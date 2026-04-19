import type { ReactNode } from 'react'

interface SectionProps {
  title: string
  subtitle?: string
  children?: ReactNode
  action?: ReactNode
  className?: string
}

export const Section = ({
  title,
  subtitle,
  children,
  action,
  className = '',
}: SectionProps) => {
  return (
    <section className={className}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
          {subtitle && <p className="text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      {children && children}
    </section>
  )
}

export default Section
