import React from 'react'
import SideBar from './components/SideBar'
import { Route, Routes, useLocation } from 'react-router-dom'
import ChatBox from './components/ChatBox'
import Login from './pages/login'
import Loading from './pages/Loading'
import './assets/prism.css'

const App = () => {

  const {pathname} = useLocation()

  if(pathname === '/loading') return <Loading />
  return (
    <>
      <div className='dark:bg-linear-to-b from-[#242124] to-[#000000] dark:text-white'>
        <div className='flex h-screen w-screen'>
          <SideBar />

          <Routes>
            <Route path="/" element={<ChatBox />} />          
          </Routes>
        </div>

      </div>
    </>
  )
}

export default App