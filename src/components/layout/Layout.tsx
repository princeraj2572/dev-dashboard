import { ReactNode } from 'react'
import Sidebar from './Sidebar'
import MainContent from './MainContent'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen bg-white dark:bg-slate-900">
      <Sidebar />
      <MainContent>{children}</MainContent>
    </div>
  )
}

export default Layout
