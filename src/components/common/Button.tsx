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
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0'

  const variantStyles = {
    primary: 'bg-brand text-brand-ink hover:brightness-110',
    gradient: 'bg-brand text-brand-ink hover:brightness-110',
    secondary: 'border border-line bg-surface text-ink hover:bg-sunken',
    danger: 'bg-danger text-white hover:brightness-110 dark:text-[#1a0a07]',
    ghost: 'text-subtle hover:bg-sunken hover:text-ink',
  }

  const sizeStyles = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-4 text-sm sm:h-10',
    lg: 'h-12 px-6 text-base',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      aria-busy={isLoading || undefined}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {isLoading ? (
        <>
          <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Loading
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
