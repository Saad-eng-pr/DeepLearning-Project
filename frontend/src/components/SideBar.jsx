import React from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets';
import { useState } from 'react';
import moment from 'moment'; 

const SideBar = () => {

  const {chats, selectedChat, setSelectedChat, theme, setTheme, user, navigate} = useAppContext();

  const [search, setSearch] = useState('');


  return (
    <div className='flex flex-col h-screen min-w-72 p-5 dark:bg-linear-to-b from-[#242124]/30 to-[#000000]/30 border-r border-[#80609F]/30 backdrop-blur-3xl transition-all duration-500 
    max-md:absolute left-0 z-1 '>
        {/* Logo */}
        <img src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark} alt="logo" className='w-full max-w-48'/>

        {/* New chat button */}
        <button className='flex justify-center items-center w-full py-2 mt-10 text-white bg-linear-to-r from-[#A456F7] to-[#3D81F6] text-sm border border-gray-400 rounded-md '>
          <span className='mr-2 text-xl'>+</span> New Chat
        </button>

        {/* Search Conversations */}
        <div className='flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-white/20 rounded-md'>
          <img src={assets.search_icon} alt="search" className='w-4 not-dark:invert'/>
          <input onChange={(e) => {setSearch(e.target.value)}} value={search} type="text" placeholder='Search conversations ...' className='text-xs placeholder:text-gray-400 outline-none'/>
        </div> 

        {/* Recent chats */}
        {chats.length > 0 && <p className='mt-4 text-sm'>Recent chats</p>}
        <div className='flex-1 overflow-y-scroll mt-3 text-sm space-y-3' >
          {
            chats.filter((chat) => chat.messages[0] ? chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase()) : 
              chat.name.toLowerCase().includes(search.toLowerCase())).map((chat) => (
                <div key={chat._id} className='p-1 px-4 border border-gray-300 rounded-md dark:border-[#80609F]/15 cursor-pointer flex justify-between group hover:bg-gray-100 hover:dark:bg-gray-900'>
                  <div onClick={() => setSelectedChat(chat)}>
                    <p className='truncate w-full'> {chat.messages.length > 0 ? chat.messages[0].content.slice(0,32) : chat.name } </p>
                    <p className='text-xs text-gray-400 dark:text-[#B1A6C0]'> {moment(chat.updatedAt).fromNow()} </p>
                  </div>

                  <img src={assets.bin_icon} alt="bin" className='w-4 hidden group-hover:block cursor-pointer not-dark:invert'/>
                </div>
              ))
          }
        </div>

        {/* Dark mode toggle */}
        <div className='flex items-center justify-between gap-2 p-2 mt-4 border border-gray-300 dark:border-white/15 rounded-md'>
          <div className='flex items-center gap-2 text-sm'>
            <img src={assets.theme_icon} alt="theme" className='not-dark:invert w-4' />
            <p>Dark Mode</p>
          </div>

          <label className='relative inline-flex cursor-pointer'>
            <input onChange={() => setTheme(theme==='dark' ? 'light' : 'dark')}
             type="checkbox" className='sr-only peer' checked={theme === 'dark'}
            />

            <div className='w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all'></div>
            <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all peer-checked:translate-x-4 '></span>
          </label>
        </div>

        {/* User Account */}
        <div className='flex items-center justify-between mt-4 gap-3 p-2 border border-gray-300 rounded-md dark:border-white/15 group cursor-pointer'>
          <img src={assets.user_icon} alt="userIcon" className='w-8 rounded-full' />
          <p className='flex-1 text-sm truncate dark:text-primary'>{user ? user.name : 'Login to your account'}</p>
        
          { user && <img src={assets.logout_icon} alt="logout" className='h-5 hidden group-hover:block cursor-pointer not-dark:invert ' /> }
        </div>

    </div>
  )
}

export default SideBar