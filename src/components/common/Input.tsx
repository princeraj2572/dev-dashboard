import { ReactNode } from 'react'

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
  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`
  const errorId = `error-${inputId}`
  const helperId = `helper-${inputId}`

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>}
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy || (error ? errorId : helperText ? helperId : undefined)}
          className={`w-full px-4 py-2.5 border rounded-lg transition-colors
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500'}
            bg-white dark:bg-slate-700 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-offset-0 dark:focus:ring-offset-slate-900
            disabled:bg-gray-100 dark:disabled:bg-slate-800 disabled:cursor-not-allowed
          `}
        />
      </div>

      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <span aria-hidden="true">⚠️</span>
          {error}
        </p>
      )}

      {helperText && !error && (
        <p id={helperId} className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  )
}

export default Input
