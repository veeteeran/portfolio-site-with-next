// src/components/chat/ChatInput.tsx
import React, { useState } from "react";
import { Send } from "lucide-react";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    await onSendMessage(input);
    setInput("");
  };

  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const submitButtonStyle = isDarkMode
    ? "bg-purple-600 text-white hover:bg-purple-500 focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50"
    : "bg-black text-white hover:bg-gray-700 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50";

  return (
    <CardFooter className="p-3 border-t">
      <form onSubmit={handleSubmit} className="flex w-full gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-400 focus:ring-opacity-50"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading}
          aria-label={isLoading ? "Sending message..." : "Send message"}
          className={
            isLoading
              ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              : submitButtonStyle
          }
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white dark:text-gray-100"
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
            <Send className="h-5 w-5" />
          )}
        </Button>
      </form>
    </CardFooter>
  );
}
