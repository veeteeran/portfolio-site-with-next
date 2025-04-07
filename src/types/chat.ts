// src/types/chat.ts
export interface MessageLink {
  text: string;
  url: string;
}

export interface Message {
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  source?: "rules" | "ai";
  links?: MessageLink[];
}
