// src/components/ui/theme-toggle.tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOverContactSection, setIsOverContactSection] = useState(false);

  useEffect(() => {
    const checkPosition = () => {
      const contactSection = document.getElementById("contact");
      if (!contactSection) return;

      const contactRect = contactSection.getBoundingClientRect();
      const toggleButton = document.getElementById("theme-toggle-button");
      if (!toggleButton) return;

      const toggleRect = toggleButton.getBoundingClientRect();

      // Check if the toggle button overlaps with the contact section
      const isOverlapping =
        toggleRect.bottom > contactRect.top &&
        toggleRect.top < contactRect.bottom;

      setIsOverContactSection(isOverlapping);
    };

    // Check on scroll and on initial load
    window.addEventListener("scroll", checkPosition);
    checkPosition();

    return () => {
      window.removeEventListener("scroll", checkPosition);
    };
  }, []);

  return (
    <button
      id="theme-toggle-button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`
        rounded-full p-2 transition-colors
        ${
          theme === "dark"
            ? "text-foreground bg-background/10 hover:bg-background/20"
            : isOverContactSection
            ? "text-white bg-white/10 hover:bg-white/20"
            : "text-foreground bg-background/10 hover:bg-background/20"
        }
      `}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
