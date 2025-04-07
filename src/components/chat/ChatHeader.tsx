// src/components/chat/ChatHeader.tsx
"use client";
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

interface ChatHeaderProps {
  onClose: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  const headerStyle = isDarkMode
    ? "bg-gray-800 text-white border-gray-700"
    : "bg-black text-white border-blue-700";

  const closeButtonStyle = isDarkMode
    ? "text-white hover:bg-gray-700 hover:text-white"
    : "text-white hover:bg-gray-700 hover:text-white";

  return (
    <CardHeader
      className={`p-3 border-b flex flex-row justify-between items-center ${headerStyle} rounded-t-xl py-3`}
    >
      <CardTitle className="font-medium text-base">
        Portfolio Assistant
      </CardTitle>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className={`h-8 w-8 rounded-full p-0 ${closeButtonStyle}`}
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
      </Button>
    </CardHeader>
  );
}
