// src/components/chat/ChatMessageList.tsx
import React, { useRef, useEffect } from "react";
import { CardContent } from "@/components/ui/card";
import { ChatMessage } from "./ChatMessage";
import { Message } from "@/types/chat";

interface ChatMessageListProps {
  messages: Message[];
  onLinkClick?: (url: string) => void;
}

export function ChatMessageList({
  messages,
  onLinkClick,
}: ChatMessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <CardContent className="flex-1 p-3 overflow-y-auto">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} onLinkClick={onLinkClick} />
      ))}
      <div ref={messagesEndRef} />
    </CardContent>
  );
}
