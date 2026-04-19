import { type ReactNode } from 'react'

export const MainContent = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex-1 overflow-auto bg-gray-50 dark:bg-slate-800">
      <div className="min-h-screen">
        {children}
      </div>
    </main>
  )
}

export default MainContent
