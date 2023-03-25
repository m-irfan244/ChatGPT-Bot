import { useState } from "react";
import { generateResponse } from "./api/openai";
import Head from "next/head";

function formatTimestamp(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  }).format(timestamp);
}

export default function Home() {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    const currentTime = new Date();
    setChatHistory([
      ...chatHistory,
      { type: "user", text: input, timestamp: currentTime },
    ]);
    setInput("");

    const response = await generateResponse(input);
    setChatHistory([
      ...chatHistory,
      { type: "user", text: input, timestamp: currentTime },
      { type: "bot", text: response, timestamp: new Date() },
    ]);
  }

  return (
    <div>
      <Head>
        <title>ChatGPT Chatbot</title>
        <meta
          name="description"
          content="A simple ChatGPT chatbot built with Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>ChatGPT Chatbot</h1>
      <div>
        {chatHistory.map((message, index) => (
          <div key={index}>
            <div>{formatTimestamp(message.timestamp)}</div>
            <div>{message.text}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
    
        />
        <button
          type="submit"
          disabled={!input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}
