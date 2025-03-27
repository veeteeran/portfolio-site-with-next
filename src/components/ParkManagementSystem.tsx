"use client";
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
import CodeDisplay from "./CodeDisplay";
import { parkManagementSnippets } from "@/data/codeSnippets";
import { VideoClip } from "./VideoPlayer";

const ParkManagementSystem = () => {
  // Convert the existing videoSections to the new VideoClip format
  const videoClips: VideoClip[] = [
    {
      title: "Reservation flow",
      videoSrc: "/videos/reservation_flow.mp4",
      description:
        "Complete reservation flow with date selection and validation",
    },
    {
      title: "Profile completion",
      videoSrc: "/videos/profile_completion.mp4",
      description:
        "Redirects user to complete profile or to the main dashboard",
    },
    {
      title: "Three day limit",
      videoSrc: "/videos/three_day_limit.mp4",
      description: "Limits park reservation to three consecutive days",
    },
    {
      title: "Four user limit",
      videoSrc: "/videos/four_user_limit.mp4",
      description: "Limits each reservation to a max of four users",
    },
  ];

  return (
    <Card className="mb-10">
      <CardHeader>
        <CardTitle className="text-2xl">Park Management System</CardTitle>
        <CardDescription>
          A full-stack web application that streamlines park access
          reservations. Features include reservation validation, user profiles,
          an intuitive dashboard, and a robust reservation system with smart
          limits to prevent overbooking and ensure fair access.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Technologies Used */}
        <div className="space-y-2">
          <h4 className="text-xl font-semibold">Key Technologies</h4>
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

        {/* Project Demo (Video Section) */}
        <div className="w-full space-y-4">
          <h4 className="text-xl font-semibold">Project Demo</h4>

          <VideoPlayer videoClips={videoClips} />
        </div>

        {/* Technical Highlights Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold">Technical Highlights</h4>
          </div>

          {/* Code Display Component */}
          <CodeDisplay codeSnippets={parkManagementSnippets} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ParkManagementSystem;
