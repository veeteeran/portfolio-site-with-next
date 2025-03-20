"use client";
import { Button } from "@/components/ui/button";

interface ScrollButtonProps {
  variant?: "default" | "outline" | "secondary" | "link";
  size?: "default" | "sm" | "lg";
  className?: string;
  sectionId?: string;
  children: React.ReactNode;
}

export default function ScrollButton({
  variant = "default",
  size = "lg",
  className = "",
  sectionId = "",
  children,
}: ScrollButtonProps) {
  const handleClick = () => {
    const pageSection = document.getElementById(sectionId);
    if (pageSection) {
      pageSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={className}
    >
      {children}
    </Button>
  );
}
