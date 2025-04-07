// src/components/chat/ChatBotButton.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useTheme } from "next-themes";

interface ChatBotButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function ChatBotButton({ isOpen, onClick }: ChatBotButtonProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [currentSection, setCurrentSection] = useState<
    "default" | "contact" | "footer"
  >("default");

  // Function to check which section the button is over
  const checkSection = () => {
    const contactSection = document.getElementById("contact");
    const footerSection = document.querySelector("footer");

    if (contactSection) {
      const contactRect = contactSection.getBoundingClientRect();
      // Check if button would be visible within the contact section
      if (
        contactRect.top < window.innerHeight - 80 &&
        contactRect.bottom > 80
      ) {
        setCurrentSection("contact");
        return;
      }
    }

    if (footerSection) {
      const footerRect = footerSection.getBoundingClientRect();
      // Check if button would be visible within the footer section
      if (footerRect.top < window.innerHeight - 80 && footerRect.bottom > 80) {
        setCurrentSection("footer");
        return;
      }
    }

    // Default section
    setCurrentSection("default");
  };

  useEffect(() => {
    // Check on initial render
    checkSection();

    // Add scroll listener
    window.addEventListener("scroll", checkSection);

    // Clean up
    return () => window.removeEventListener("scroll", checkSection);
  }, []);

  // If chat is open, don't show the button
  if (isOpen) {
    return null;
  }

  // Set button styling based on section and theme
  let buttonStyle = "";
  let iconColor = "";

  if (isDarkMode) {
    // Dark mode styling (consistent across sections)
    buttonStyle = "bg-gray-200 hover:bg-gray-300 border-gray-400";
    iconColor = "text-black";
  } else {
    // Light mode styling based on section
    switch (currentSection) {
      case "contact":
        // On contact section: white background, black icon
        buttonStyle = "bg-white hover:bg-gray-100 border-gray-200";
        iconColor = "text-black";
        break;
      case "footer":
      case "default":
      default:
        // On other sections: black background, white icon
        buttonStyle = "bg-black hover:bg-gray-800 border-gray-700";
        iconColor = "text-white";
        break;
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className={`fixed bottom-4 right-4 rounded-full z-50 transition-all ${buttonStyle}`}
      onClick={onClick}
      aria-label="Open chat"
    >
      <MessageSquare className={iconColor} size={20} />
    </Button>
  );
}
