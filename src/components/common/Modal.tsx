import type { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  actions?: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  size = 'md',
}: ModalProps) => {
  if (!isOpen) return null

  const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay with blur backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        role="presentation"
      />

      {/* Modal */}
      <div
        className={`relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl ${sizeStyles[size]} mx-4 transform transition-all duration-300`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-700 px-8 py-6">
          <h2 id="modal-title" className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-slate-700 rounded-lg transition-all duration-200"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 max-h-96 overflow-y-auto">{children}</div>

        {/* Footer */}
        {actions && (
          <div className="border-t border-gray-200 dark:border-slate-700 px-8 py-6 flex justify-end gap-3 bg-gray-50 dark:bg-slate-900/50 rounded-b-2xl">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
