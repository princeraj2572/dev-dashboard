import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import MainContent from './MainContent'

export const Layout = () => {
  return (
    <div className="flex h-screen bg-white dark:bg-slate-900">
      <Sidebar />
      <MainContent>
        <Outlet />
      </MainContent>
    </div>
  )
}

export default Layout
