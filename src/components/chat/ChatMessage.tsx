// src/components/chat/ChatMessage.tsx
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Message } from "@/types/chat";
import { useTheme } from "next-themes";

interface ChatMessageProps {
  message: Message;
  onLinkClick?: (url: string) => void;
}

export function ChatMessage({ message, onLinkClick }: ChatMessageProps) {
  const renderMessageContent = (message: Message) => {
    if (!message.links || message.links.length === 0) {
      return message.content;
    }

    const parts = [];
    let remainingText = message.content;

    message.links.forEach((link, linkIndex) => {
      const splitIndex = remainingText.indexOf(link.text);

      if (splitIndex !== -1) {
        // Add text before the link
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
            className="text-blue-600 dark:text-purple-500 hover:text-blue-800 dark:hover:text-purple-300 underline"
            onClick={() => {
              if (onLinkClick) {
                onLinkClick(link.url);
              }
            }}
          >
            {link.text}
          </a>
        );

        // Update remaining text
        remainingText = remainingText.substring(splitIndex + link.text.length);
      }
    });

    if (remainingText) {
      parts.push(<span key="text-end">{remainingText}</span>);
    }

    return parts;
  };

  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  const avatarStyle = isDarkMode ? "bg-gray-800" : "bg-black";
  const userMessageBg = isDarkMode ? "bg-purple-600" : "bg-blue-600";
  const userMessageTimeColor = isDarkMode ? "text-purple-300" : "text-blue-100";

  return (
    <div
      className={`flex mb-2 items-start ${
        message.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {message.sender === "bot" && (
        <Avatar className="h-8 w-8 mr-2">
          <AvatarFallback
            className={`${avatarStyle} border-gray-700 text-white text-xs`}
          >
            VT
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={`p-2 rounded-lg max-w-[80%] ${
          message.sender === "user"
            ? `${userMessageBg} text-white rounded-tr-none`
            : "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-tl-none"
        }`}
      >
        {renderMessageContent(message)}
        {message.source === "ai" && (
          <div className="text-xs mt-1 italic">AI-powered response</div>
        )}
        <div
          className={`text-xs mt-1 ${
            message.sender === "user"
              ? userMessageTimeColor
              : "text-gray-500 dark:text-gray-300"
          }`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
