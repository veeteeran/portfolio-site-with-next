"use client";
import Image from "next/image";
import { Users, Code, Server, Database, CheckCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import VideoPlayer from "./VideoPlayer";
import { useState } from "react";
import CodeDisplay from "./CodeDisplay";
import { parkManagementSnippets } from "@/data/codeSnippets";

interface VideoSection {
  id: string;
  title: string;
  videoSrc: string;
  description: string;
}

const ParkManagementSystem = () => {
  const videoSections: VideoSection[] = [
    {
      id: "reservation",
      title: "Reservation flow",
      videoSrc: "/videos/reservation_flow.mp4",
      description:
        "Complete reservation flow with date selection and validation",
    },
    {
      id: "profile",
      title: "Profile completion",
      videoSrc: "/videos/profile_completion.mp4",
      description:
        "Redirects user to complete profile or to the main dashboard",
    },
    {
      id: "three-day-limit",
      title: "Three day limit",
      videoSrc: "/videos/three_day_limit.mp4",
      description: "Limits park reservation to three consecutive days",
    },
    {
      id: "four-user-limit",
      title: "Four user limit",
      videoSrc: "/videos/four_user_limit.mp4",
      description: "Limits each reservation to a max of four users",
    },
  ];

  const [activeVideo, setActiveVideo] = useState(videoSections[0]);

  return (
    <Card className="mb-10">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-md">
            <Image
              src="/images/park-management.png"
              alt="Park Management System"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <CardTitle className="text-2xl">Park Management System</CardTitle>
            <CardDescription>
              A full-stack web application for managing park reservations
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Project Demo (Video Section) */}
        <div className="w-full space-y-4">
          <h4 className="text-xl font-semibold">Project Demo</h4>

          {/* Video Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {videoSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveVideo(section)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  activeVideo.id === section.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* Active Video Player */}
          <VideoPlayer
            videoSrc={activeVideo.videoSrc}
            title={`${activeVideo.description}`}
          />
        </div>

        {/* Technical Highlights Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold">Technical Highlights</h4>
          </div>

          {/* Code Display Component */}
          <CodeDisplay codeSnippets={parkManagementSnippets} />
        </div>

        {/* Technologies Used */}
        <div className="space-y-2">
          <h4 className="text-lg font-medium">Key Technologies</h4>
          <div className="flex flex-wrap gap-3">
            <Badge
              variant="outline"
              className="flex items-center gap-1 px-3 py-1"
            >
              <Server className="h-3.5 w-3.5 text-blue-500" />
              <span>Next.js</span>
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1 px-3 py-1"
            >
              <Code className="h-3.5 w-3.5 text-blue-500" />
              <span>TypeScript</span>
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1 px-3 py-1"
            >
              <Database className="h-3.5 w-3.5 text-green-500" />
              <span>Prisma ORM</span>
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1 px-3 py-1"
            >
              <CheckCircle className="h-3.5 w-3.5 text-purple-500" />
              <span>Jest & Testing Library</span>
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1 px-3 py-1"
            >
              <Users className="h-3.5 w-3.5 text-orange-500" />
              <span>User Authentication</span>
            </Badge>
          </div>
        </div>

        <p className="text-muted-foreground">
          A personal project built to streamline park reservations. Features
          include real-time availability tracking, user registration, an
          interactive dashboard, and a robust reservation system with validation
          rules.
        </p>
      </CardContent>
    </Card>
  );
};

export default function FeaturedProjects() {
  return (
    <section id="projects" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Projects
        </h2>
        <ParkManagementSystem />

        {/* Add more projects here */}
      </div>
    </section>
  );
}
