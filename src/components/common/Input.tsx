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
  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`
  const errorId = `error-${inputId}`
  const helperId = `helper-${inputId}`

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
          {label}
          {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
        </label>
      )}

      <div className="relative group">
        {icon && <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">{icon}</div>}
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy || (error ? errorId : helperText ? helperId : undefined)}
          className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200
            ${icon ? 'pl-11' : ''}
            ${error 
              ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20 dark:border-red-500 dark:focus:border-red-400' 
              : 'border-gray-300 dark:border-gray-600 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/30'
            }
            bg-white dark:bg-slate-700 dark:text-white
            focus:outline-none
            disabled:bg-gray-100 dark:disabled:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50
            placeholder:text-gray-400 dark:placeholder:text-gray-500
          `}
        />
      </div>

      {error && (
        <p id={errorId} className="mt-2 text-sm font-medium text-red-600 dark:text-red-400 flex items-center gap-1">
          <span aria-hidden="true">⚠️</span>
          {error}
        </p>
      )}

      {helperText && !error && (
        <p id={helperId} className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  )
}

export default Input
