import { type ReactNode } from 'react'

export const MainContent = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-slate-900">
      {/* Content wrapper with proper spacing and responsive padding */}
      <div className="w-full">
        {children}
      </div>
    </main>
  )
}

export default MainContent
