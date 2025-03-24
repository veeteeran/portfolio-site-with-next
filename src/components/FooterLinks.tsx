"use client";
import React from "react";
import { Github, Linkedin } from "lucide-react";
import { getGithubUrl, getLinkedInUrl } from "@/lib/utils";
import { Button } from "./ui/button";

type SocialLink = {
  name: string;
  url: string;
  icon: React.ReactNode;
  ariaLabel: string;
};

export default function FooterLinks() {
  const socialLinks: SocialLink[] = [
    {
      name: "GitHub",
      url: getGithubUrl(),
      icon: <Github size={20} />,
      ariaLabel: "Visit Viet Tran's GitHub profile",
    },
    {
      name: "LinkedIn",
      url: getLinkedInUrl(),
      icon: <Linkedin size={20} />,
      ariaLabel: "Visit Viet Tran's LinkedIn profile",
    },
  ];

  return (
    <div className="flex mt-4 md:mt-0">
      {socialLinks.map((link) => (
        <Button
          key={link.name}
          onClick={() => window.open(link.url, "_blank", "noopener,noreferrer")}
          className="p-2 hover:text-primary hover:bg-primary/10 transition-colors rounded-full"
          aria-label={link.ariaLabel}
          type="button"
          variant="link"
        >
          {link.icon}
        </Button>
      ))}
    </div>
  );
}
