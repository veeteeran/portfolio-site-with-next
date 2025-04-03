// src/components/chat/ChatBot.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface Message {
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  source?: "rules" | "ai";
  links?: Array<{
    text: string;
    url: string;
  }>;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      content:
        "Hi there! I'm Viet's portfolio assistant. Ask me about his experience, skills, or projects!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages
        .filter((msg) => msg.sender === "user" || msg.sender === "bot")
        .map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.content,
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          history,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const botResponse: Message = {
        content: data.response.text || data.response,
        sender: "bot",
        timestamp: new Date(),
        source: data.source,
        links: data.response.links,
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error getting chatbot response:", error);

      const errorMessage: Message = {
        content: "Sorry, I couldn't process your message. Please try again.",
        sender: "bot",
        timestamp: new Date(),
        source: "rules",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageContent = (message: Message) => {
    if (!message.links || message.links.length === 0) {
      return message.content;
    }

    const parts = [];
    let remainingText = message.content;

    message.links.forEach((link, linkIndex) => {
      const splitIndex = remainingText.indexOf(link.text);

      if (splitIndex !== -1) {
        if (splitIndex > 0) {
          parts.push(
            <span key={`text-${linkIndex}-before`}>
              {remainingText.substring(0, splitIndex)}
            </span>
          );
        }

        parts.push(
          <a
            key={`link-${linkIndex}`}
            href={link.url}
            className="text-blue-600 hover:text-blue-800 underline"
            onClick={() => {
              if (link.url === "#contact") {
                setIsOpen(false);
              }
            }}
          >
            {link.text}
          </a>
        );

        remainingText = remainingText.substring(splitIndex + link.text.length);
      }
    });

    if (remainingText) {
      parts.push(<span key="text-end">{remainingText}</span>);
    }

    return parts;
  };

  return (
    <>
      {/* Chat bubble button */}
      <button
        className={`fixed bottom-4 right-4 p-4 rounded-full bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700 z-50 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-4 right-4 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col z-50 transition-all ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        {/* Chat header */}
        <div className="p-3 border-b flex justify-between items-center bg-blue-600 text-white rounded-t-lg">
          <h3 className="font-medium">Portfolio Assistant</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full hover:bg-blue-700 transition-colors"
            aria-label="Close chat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 max-w-[80%] ${
                message.sender === "user" ? "ml-auto" : "mr-auto"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-gray-200 text-gray-800 rounded-tl-none"
                }`}
              >
                {/* Use the helper function to render message content with links */}
                {renderMessageContent(message)}
                {message.source === "ai" && (
                  <div className="text-xs mt-1 italic">AI-powered response</div>
                )}
              </div>
              <div
                className={`text-xs text-gray-500 mt-1 ${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat input */}
        <form onSubmit={handleSubmit} className="p-3 border-t flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`p-2 rounded-r-md transition-colors ${
              isLoading
                ? "bg-gray-400 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            disabled={isLoading}
            aria-label="Send message"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <Send size={18} />
            )}
          </button>
        </form>
      </div>
    </>
  );
}
