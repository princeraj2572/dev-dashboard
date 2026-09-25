import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  fullWidth?: boolean
  className?: string
  ariaLabel?: string
  isLoading?: boolean
}

export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  className = '',
  ariaLabel,
  isLoading = false,
}: ButtonProps) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95'

  const variantStyles = {
    primary: 'bg-indigo-600 dark:bg-indigo-600 text-white hover:bg-indigo-700 dark:hover:bg-indigo-500 focus:ring-indigo-500 shadow-md hover:shadow-lg',
    secondary: 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-600 focus:ring-gray-400 shadow-sm hover:shadow-md',
    danger: 'bg-red-600 dark:bg-red-600 text-white hover:bg-red-700 dark:hover:bg-red-500 focus:ring-red-500 shadow-md hover:shadow-lg',
    ghost: 'bg-transparent text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-700/50 focus:ring-indigo-500 border border-indigo-200 dark:border-indigo-400/30',
    gradient: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 text-white shadow-lg hover:shadow-xl focus:ring-indigo-500',
  }

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthClass} ${className}`}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
