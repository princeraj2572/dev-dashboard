import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import MainContent from './MainContent'

export const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <MainContent>
        <Outlet />
      </MainContent>
    </div>
  )
}

export default Layout
