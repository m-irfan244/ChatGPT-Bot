import { useState, useRef, useEffect } from 'react';
import { generateResponse } from './api/openai'
import Head from 'next/head';

function formatTimestamp(timestamp) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(timestamp);
}

export default function Home() {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatHistory]);

  async function handleSubmit(e) {
    e.preventDefault();

    const currentTime = new Date();
    setChatHistory([
      ...chatHistory,
      { type: 'user', text: input, timestamp: currentTime },
    ]);
    setInput('');

    const response = await generateResponse(input);
    setChatHistory([
      ...chatHistory,
      { type: 'user', text: input, timestamp: currentTime },
      { type: 'bot', text: response, timestamp: new Date() },
    ]);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Head>
        <title>ChatGPT Chatbot</title>
        <meta name="description" content="A simple ChatGPT chatbot built with Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-2xl text-gray-800 mb-4">ChatGPT Chatbot</h1>
      <div className="bg-white shadow-md p-4 rounded-md w-full max-w-lg h-96 overflow-y-auto" ref={chatBoxRef}>
        {chatHistory.map((message, index) => (
          <div key={index} className="my-2">
            <div className="text-xs text-gray-600 mb-1">
              {formatTimestamp(message.timestamp)}
            </div>
            <div
              className={`${
                message.type === 'user'
                  ? 'bg-blue-500 text-white rounded-r-md'
                  : 'bg-gray-300 text-gray-800 rounded-l-md'
              } p-2 max-w-md break-all ${
                message.type === 'user' ? 'ml-auto' : 'mr-auto'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 w-full max-w-lg flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className="flex-grow border-2 border-gray-300 rounded-l-md p-2 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className={`${
            input.trim() ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300'
          } text-white px-6 py-2 rounded-r-md focus:outline-none`}
          disabled={!input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}
