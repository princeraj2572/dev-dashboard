import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description?: string
  action?: ReactNode
}

export const PageHeader = ({ title, description, action }: PageHeaderProps) => (
  <header className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
    <div className="min-w-0">
      <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{title}</h1>
      {description && <p className="mt-1.5 max-w-prose text-subtle">{description}</p>}
    </div>
    {action}
  </header>
)

export default PageHeader
