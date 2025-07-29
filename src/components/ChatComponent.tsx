import { useState } from 'react';
import { LuBot, LuSendHorizontal } from 'react-icons/lu';
import useChatbot from '../hooks/useChatbot';
import Markdown from 'react-markdown';
import useChatScroll from '../hooks/useChatScroll';

const ChatComponent = () => {
    const [Input, setInput] =  useState('')
    const {messages, sendMessage} = useChatbot()
    const messageRef =  useChatScroll(messages)

    const handleSend = () => {
        if (Input.trim()) {
            sendMessage(Input)
            setInput("")
        }
    }
  return (
    <div className='flex flex-col h-[80vh] bg-white'>
        <h2 className='p-4 font-semibold text-lg text-center bg-blue-100  text-blue-800  flex justify-between items-center gap-2'> 
            React + OpenAI Chatbot <LuBot size={25} />
        </h2>
        <div ref={messageRef} className='flex-1 overflow-y-auto p-2 space-y-2'>
            {messages.map((message, index) => (
                <div key={index} className={`p-3 rounded-lg max-w-xs ${message.sender === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 text-gray-800"}`}>
                    <Markdown>{message.text}</Markdown>
                </div>
            ))}
        </div>
        <div className='flex items-center p-4 bg-gray-50'>
            <input
                type='text'
                className='flex-1 p-2 border rounded-lg focus:outline-none'
                placeholder='your message here..'
                value={Input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={() => handleSend() } className='p-2'>
                <LuSendHorizontal size={25} />
            </button>
        </div>
    </div>
  );
};

export default ChatComponent;