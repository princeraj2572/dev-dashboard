import { useId } from 'react'
import type { ReactNode } from 'react'

interface InputProps {
  label?: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
  error?: string
  helperText?: string
  disabled?: boolean
  required?: boolean
  className?: string
  icon?: ReactNode
  ariaLabel?: string
  ariaDescribedBy?: string
}

export const Input = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  helperText,
  disabled = false,
  required = false,
  className = '',
  icon,
  ariaLabel,
  ariaDescribedBy,
}: InputProps) => {
  const inputId = useId()
  const errorId = `error-${inputId}`
  const helperId = `helper-${inputId}`

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium">
          {label}
          {required && (
            <span className="ml-1 text-danger" aria-label="required">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle [&_svg]:size-4">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-label={ariaLabel}
          aria-invalid={error ? true : undefined}
          aria-describedby={ariaDescribedBy || (error ? errorId : helperText ? helperId : undefined)}
          className={`h-11 w-full rounded-lg border bg-surface px-3 text-base text-ink transition-colors placeholder:text-subtle/70 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25 disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:text-sm ${
            icon ? 'pl-9' : ''
          } ${error ? 'border-danger' : 'border-line'}`}
        />
      </div>

      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p id={helperId} className="mt-1.5 text-sm text-subtle">
          {helperText}
        </p>
      )}
    </div>
  )
}

export default Input
