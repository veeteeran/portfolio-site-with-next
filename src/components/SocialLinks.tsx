"use client";
import { getGithubUrl, getLinkedInUrl } from "@/lib/utils";
import { Linkedin, Github } from "lucide-react";

export function SocialLinks() {
  const handleLinkedInClick = () => {
    window.open(getLinkedInUrl(), "_blank", "noopener,noreferrer");
  };

  const handleGithubClick = () => {
    window.open(getGithubUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="grid gap-4">
      <button
        onClick={handleLinkedInClick}
        className="flex items-center p-4 bg-muted/30 rounded-lg hover:bg-muted/60 transition-colors text-left w-full"
      >
        <Linkedin className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0" />
        <div>
          <h3 className="font-medium">LinkedIn</h3>
          <p className="text-sm text-muted-foreground">
            Connect professionally
          </p>
        </div>
      </button>

      <button
        onClick={handleGithubClick}
        className="flex items-center p-4 bg-muted/30 rounded-lg hover:bg-muted/60 transition-colors text-left w-full"
      >
        <Github className="h-5 w-5 mr-3 flex-shrink-0" />
        <div>
          <h3 className="font-medium">GitHub</h3>
          <p className="text-sm text-muted-foreground">Explore my code</p>
        </div>
      </button>
    </div>
  );
}
