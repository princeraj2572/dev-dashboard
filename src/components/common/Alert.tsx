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
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-700 dark:text-green-300',
      icon: '✓',
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-700 dark:text-red-300',
      icon: '✕',
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-700 dark:text-yellow-300',
      icon: '⚠',
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-700 dark:text-blue-300',
      icon: 'ⓘ',
    },
  }

  const style = typeStyles[type]

  return (
    <div
      role="alert"
      className={`${style.bg} border ${style.border} ${style.text} rounded-lg p-4 flex items-start gap-3 ${className}`}
    >
      <span className="text-lg flex-shrink-0" aria-hidden="true">
        {style.icon}
      </span>
      <div className="flex-1">
        {title && <p className="font-semibold mb-1">{title}</p>}
        {children}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close alert"
          className="text-xl leading-none hover:opacity-70 transition-opacity"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default Alert
