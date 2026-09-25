import { type ReactNode } from 'react'

export const MainContent = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-w-0 flex-1 pb-24 md:pb-0">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{children}</div>
    </main>
  )
}

export default MainContent
