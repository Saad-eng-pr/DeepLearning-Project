import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets';
import Message from './Message';
import { sendMessage, fetchMessages } from "../api/chatApi";


const ChatBox = () => {
  const containerRef = useRef(null);  
  const bottomRef = useRef(null);

  const {selectedChat, theme} = useAppContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState('Text');


  const onSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setPrompt("");

    try {
      const data = await sendMessage(prompt, selectedChat.id);

      setMessages((prev) => [...prev, ...data.messages]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const loadMessages = async () => {
      if (!selectedChat) return;
      try {
        const messages = await fetchMessages(selectedChat.id);
        setMessages(messages);
      } catch (err) {
        console.error(err);
      }
    };
    loadMessages();
  }, [selectedChat]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);
  
  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl-pr-40'>
      
      {/* Chat messages */}
      <div ref={containerRef} className='flex-1 mb-5 overflow-y-scroll'>
        {messages.length === 0 && (
          <div className='h-full flex flex-col items-center justify-center gap-2 text-primary'>
            <img src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark}  alt="logo" className='w-full max-w-56 sm:max-w-68 '/>
            <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white '>Ask me anything.</p>
          </div>
        )}

        {messages.map((message, index) => (
          <Message key={index} message={message}/>
        ))}

        <div ref={bottomRef} />
        
        {/* Three dots loading */}
        {
          loading && <div className='loader flex items-center gap-1.5'>
              <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
              <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
              <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
            </div>
        }
      </div>


      {/* Prompt input box */}
      <form onSubmit={onSubmit} className='flex gap-4 items-center w-full border rounded-full border-primary dark:border-[#80609F]/30 max-w-2xl pl-4 mx-auto'>
        <select onChange={(e) => setMode(e.target.value)} value={mode} className='text-sm pl-3 pr-2 outline-none'>
          <option className='dark:bg-purple-900' value="Text">Text</option>
          <option className='dark:bg-purple-900' value="Image">Image</option>
        </select>

        <input onChange={(e) => setPrompt(e.target.value)} value={prompt} type="text" placeholder='How can i help you ...' className='flex-1 w-full text-sm outline-none' required/>

        <button disabled={loading} >
          <img src={loading ? assets.stop_icon : assets.send_icon} alt="prompt" className='cursor-pointer w-8 m-2'/>
        </button>
      </form>
    </div>
  )
}

export default ChatBox