// src/app/api/chat/route.ts
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

interface ResponseObject {
  text: string;
  links?: Array<{
    text: string;
    url: string;
  }>;
}

type ResponseValue = string | ResponseObject;

interface KnowledgeBase {
  [key: string]: {
    patterns: string[];
    responses: ResponseValue[];
  };
}

const knowledgeBase: KnowledgeBase = {
  greeting: {
    patterns: ["hello", "hi", "hey", "greetings", "howdy", "whats up"],
    responses: [
      "Hello! I'm Viet's portfolio assistant. How can I help you?",
      "Hi there! I'm here to tell you about Viet's work and experience. What would you like to know?",
    ],
  },
  experience: {
    patterns: ["experience", "work", "job", "career", "worked", "company"],
    responses: [
      "Viet has over 3 years of software engineering experience. He worked at Column Software as a Software Engineer II from Nov 2021 to Dec 2024, and as a Junior Web Developer at Station8 before that.",
    ],
  },
  skills: {
    patterns: [
      "skills",
      "technologies",
      "tech stack",
      "programming",
      "languages",
      "frameworks",
    ],
    responses: [
      {
        text: "Viet's frontend skills include TypeScript, React, Next.js, HTML/CSS, and Tailwind. For backend, he's experienced with Node.js, Express.js, REST APIs, and databases like MySQL and PostgreSQL.",
        links: [
          {
            text: "skills",
            url: "#skills",
          },
        ],
      },
    ],
  },
  projects: {
    patterns: [
      "projects",
      "portfolio",
      "built",
      "created",
      "developed",
      "made",
    ],
    responses: [
      {
        text: "You can check out Viet's projects by visiting the Projects section of this site. He's worked on modernizing legacy newspaper systems, building reusable React components, and various web applications.",
        links: [
          {
            text: "Projects section",
            url: "#projects",
          },
        ],
      },
    ],
  },
  contact: {
    patterns: ["contact", "email", "reach", "message", "connect", "linkedin"],
    responses: [
      {
        text: "You can contact Viet through the Contact section of this website.",
        links: [
          {
            text: "Contact section",
            url: "#contact",
          },
        ],
      },
    ],
  },
  education: {
    patterns: [
      "education",
      "school",
      "degree",
      "study",
      "university",
      "college",
    ],
    responses: [
      "Viet studied Software Engineering with a focus on Web Stack at Holberton School in Tulsa, and has a B.S. in Film and Video from Grand Valley State University.",
    ],
  },
  location: {
    patterns: ["location", "based", "live", "city", "country", "where"],
    responses: ["Viet is based in Tulsa, Oklahoma and is open to remote work."],
  },
  fallback: {
    patterns: [],
    responses: [
      "I don't have information about that yet. Would you like to know about Viet's experience, skills, or projects instead?",
      "I'm not sure about that. Is there something specific about Viet's background or work that I can help with?",
    ],
  },
};

// Match user input to knowledge base patterns
const findResponse = (input: string): ResponseObject => {
  // Convert input to lowercase for case-insensitive matching
  const normalizedInput = input.toLowerCase();

  // Check each category in the knowledge base
  for (const [category, data] of Object.entries(knowledgeBase)) {
    // Skip the fallback category
    if (category === "fallback") continue;

    // Check if any pattern matches the input
    const match = data.patterns.some((pattern) =>
      normalizedInput.includes(pattern)
    );

    if (match) {
      // Return a random response from the matching category
      const randomIndex = Math.floor(Math.random() * data.responses.length);
      const response = data.responses[randomIndex];

      // Check if the response is a string or an object with links
      if (typeof response === "string") {
        return { text: response };
      } else {
        return response; // Return the object with text and links
      }
    }
  }

  // Return a random fallback response if no match is found
  const fallbackResponses = knowledgeBase.fallback.responses;
  const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
  const response = fallbackResponses[randomIndex];

  if (typeof response === "string") {
    return { text: response };
  } else {
    return response;
  }
};

// Optional: Implement AI service integration
// Uncomment and configure if using AI capabilities
/*
import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getAIResponse(message: string, history: any[]) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for Viet Tran's portfolio website. Answer questions about his experience as a Software Engineer at Column Software and Station8, his skills in TypeScript, React, Node.js, etc., and his education at Holberton School and Grand Valley State University. Keep responses brief and focused on his professional background."
        },
        ...history,
        { role: "user", content: message }
      ],
      max_tokens: 150,
    });

    return completion.choices[0].message.content || "I couldn't process that request.";
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return "Sorry, I'm having trouble connecting to my brain right now. Please try again later.";
  }
}
*/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history } = body;

    // First, try rule-based response
    const ruleBasedResponse = findResponse(message);

    // If using a "smart" fallback with AI, uncomment this section
    /*
    // Check if the response is a fallback response
    const isFallback = knowledgeBase.fallback.responses.includes(ruleBasedResponse);

    // If it's a fallback and we have AI configured, use AI instead
    if (isFallback && process.env.OPENAI_API_KEY) {
      try {
        const aiResponse = await getAIResponse(message, history);
        return NextResponse.json({ response: aiResponse, source: 'ai' });
      } catch (error) {
        console.error("AI service error:", error);
        // Fall back to rule-based if AI fails
        return NextResponse.json({ response: ruleBasedResponse, source: 'rules' });
      }
    }
    */

    // Otherwise, use the rule-based response
    console.log(history);
    return NextResponse.json({ response: ruleBasedResponse, source: "rules" });
  } catch (error) {
    console.error("Error processing chat request:", error);
    return NextResponse.json(
      { error: "Failed to process your message" },
      { status: 500 }
    );
  }
}
