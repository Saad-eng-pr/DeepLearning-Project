import React from 'react'
import SideBar from './components/SideBar'
import { Route, Routes } from 'react-router-dom'
import ChatBox from './components/ChatBox'
import Login from './pages/login'
import Loading from './pages/Loading'
import './assets/prism.css'

const App = () => {
  return (
    <>
      <div className='dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white'>
        <div className='flex h-screen w-screen'>
          <SideBar />

          <Routes>
            <Route path="/" element={<ChatBox />} />
            
            <Route path="/login" element={<Login />} />
          

            
          </Routes>
        </div>

      </div>
    </>
  )
}

export default App