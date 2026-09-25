import type { ReactNode } from 'react'

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  children: ReactNode
  onClose?: () => void
  className?: string
}

export const Alert = ({
  type,
  title,
  children,
  onClose,
  className = '',
}: AlertProps) => {
  const typeStyles = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/30',
      border: 'border-green-300 dark:border-green-600',
      text: 'text-green-800 dark:text-green-200',
      bgIcon: 'bg-green-100 dark:bg-green-900/50',
      icon: '✓',
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/30',
      border: 'border-red-300 dark:border-red-600',
      text: 'text-red-800 dark:text-red-200',
      bgIcon: 'bg-red-100 dark:bg-red-900/50',
      icon: '✕',
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/30',
      border: 'border-yellow-300 dark:border-yellow-600',
      text: 'text-yellow-800 dark:text-yellow-200',
      bgIcon: 'bg-yellow-100 dark:bg-yellow-900/50',
      icon: '⚠',
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/30',
      border: 'border-blue-300 dark:border-blue-600',
      text: 'text-blue-800 dark:text-blue-200',
      bgIcon: 'bg-blue-100 dark:bg-blue-900/50',
      icon: 'ⓘ',
    },
  }

  const style = typeStyles[type]

  return (
    <div
      role="alert"
      className={`${style.bg} border-2 ${style.border} ${style.text} rounded-xl p-6 flex items-start gap-4 ${className}`}
    >
      <span className={`${style.bgIcon} text-xl leading-none flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold`} aria-hidden="true">
        {style.icon}
      </span>
      <div className="flex-1">
        {title && <p className="font-bold text-lg mb-2">{title}</p>}
        <div className="text-sm opacity-90">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close alert"
          className="text-2xl leading-none hover:opacity-50 transition-opacity flex-shrink-0 p-1"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default Alert
