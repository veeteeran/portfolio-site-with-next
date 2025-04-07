// src/components/chat/ChatBot.tsx
"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChatBotButton } from "./ChatBotButton";
import { ChatHeader } from "./ChatHeader";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInput } from "./ChatInput";
import { Message } from "@/types/chat";

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
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      content: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Format history for API
      const history = messages
        .filter((msg) => msg.sender === "user" || msg.sender === "bot")
        .map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.content,
        }));

      // Call the API route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          history,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      // Add bot response - Handle response object format correctly
      const botResponse: Message = {
        // Check if response is an object with text property or just a string
        content: data.response.text || data.response,
        sender: "bot",
        timestamp: new Date(),
        source: data.source,
        // Add links if they exist
        links: data.response.links,
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error getting chatbot response:", error);

      // Add error message
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

  const handleLinkClick = (url: string) => {
    // Close the chat when clicking specific links
    if (url === "#contact") {
      setIsOpen(false);
    }
  };

  const closeChat = () => setIsOpen(false);
  const openChat = () => setIsOpen(true);

  return (
    <>
      {/* Chat bubble button */}
      <ChatBotButton isOpen={isOpen} onClick={openChat} />

      {/* Chat window */}
      <Card
        className={`fixed bottom-4 right-4 w-80 sm:w-96 h-96 shadow-xl flex flex-col z-50 p-0 transition-all ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <ChatHeader onClose={closeChat} />
        <ChatMessageList messages={messages} onLinkClick={handleLinkClick} />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </Card>
    </>
  );
}
