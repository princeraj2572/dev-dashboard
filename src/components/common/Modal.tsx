import { useEffect, useId } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  actions?: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export const Modal = ({ isOpen, onClose, title, children, actions, size = 'md' }: ModalProps) => {
  const titleId = useId()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeStyles = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg' }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} role="presentation" />

      <div
        className={`relative w-full ${sizeStyles[size]} rounded-t-2xl border border-line bg-surface sm:rounded-2xl`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="flex items-center justify-between gap-4 px-5 pt-5 sm:px-6">
          <h2 id={titleId} className="text-xl font-semibold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-9 place-items-center rounded-lg text-subtle hover:bg-sunken hover:text-ink"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-5 py-4 text-subtle sm:px-6">{children}</div>

        {actions && (
          <div className="flex justify-end gap-2 border-t border-line px-5 py-4 sm:px-6">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
