import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLinkedInUrl = () => {
  return `https://linkedin.com/in/${process.env.NEXT_PUBLIC_LINKEDIN_USERNAME}`;
};

export const getGithubUrl = () => {
  return `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`;
};
