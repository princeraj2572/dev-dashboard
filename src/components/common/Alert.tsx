import type { ReactNode } from 'react'
import { CircleCheck, CircleAlert, TriangleAlert, Info, X } from 'lucide-react'

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  children: ReactNode
  onClose?: () => void
  className?: string
}

const styles = {
  success: { box: 'bg-brand-soft', icon: 'text-brand', Icon: CircleCheck },
  error: { box: 'bg-danger-soft', icon: 'text-danger', Icon: CircleAlert },
  warning: { box: 'bg-amber-soft', icon: 'text-amber', Icon: TriangleAlert },
  info: { box: 'bg-sunken', icon: 'text-subtle', Icon: Info },
}

export const Alert = ({ type, title, children, onClose, className = '' }: AlertProps) => {
  const { box, icon, Icon } = styles[type]

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      className={`flex items-start gap-3 rounded-xl p-4 text-ink ${box} ${className}`}
    >
      <Icon className={`mt-0.5 size-5 shrink-0 ${icon}`} aria-hidden="true" />
      <div className="min-w-0 flex-1 text-sm">
        {title && <p className="font-semibold">{title}</p>}
        <div className={title ? 'mt-0.5 text-subtle' : ''}>{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="-m-1 grid size-8 shrink-0 place-items-center rounded-md text-subtle hover:bg-black/5 hover:text-ink dark:hover:bg-white/10"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

export default Alert
