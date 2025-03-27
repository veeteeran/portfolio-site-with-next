"use client";
import React, { useRef, useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, ChevronUp, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface VideoClip {
  title: string;
  videoSrc: string;
  description: string;
}

interface VideoPlayerProps {
  // Support for both single video and multiple videos
  videoSrc?: string;
  title?: string;
  videoClips?: VideoClip[];
}

export default function VideoPlayer({
  videoSrc,
  title,
  videoClips,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // If videoClips is provided, use that; otherwise, create a single clip from videoSrc and title
  const clips = videoClips || [
    {
      title: title || "Video",
      videoSrc: videoSrc,
      description: title || "",
    },
  ];

  const [activeVideo, setActiveVideo] = useState<string>(clips[0].title);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
      setIsPlaying(false);
    }
  }, [activeVideo]);

  // Ensures compatibility with the existing implementation when videoSrc prop changes
  useEffect(() => {
    if (!videoClips && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
      setIsPlaying(false);
    }
  }, [videoSrc, videoClips]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // If only one clip is available (no tabs needed), render simpler UI
  if (clips.length === 1 && !videoClips) {
    return (
      <div className="relative w-full max-w-3xl mx-auto">
        {!isPlaying && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer z-10"
            onClick={handlePlayPause}
          >
            <button
              aria-label="Play video"
              className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
            >
              <Play className="h-6 w-6 fill-current text-black" />
            </button>
          </div>
        )}

        <video
          ref={videoRef}
          className="w-full rounded-lg shadow-md"
          controls={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {title && <div className="mt-2 text-sm text-gray-600">{title}</div>}
      </div>
    );
  }

  // For multiple clips, use the tabs UI
  return (
    <div className="space-y-4">
      <Tabs
        defaultValue={clips[0].title}
        className="w-full"
        onValueChange={(value) => setActiveVideo(value)}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <TabsList className="grid grid-cols-2 md:grid-cols-4">
            {clips.map((clip) => (
              <TabsTrigger key={clip.title} value={clip.title}>
                {clip.title}
              </TabsTrigger>
            ))}
          </TabsList>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowVideo(!showVideo)}
            className="flex items-center gap-1"
          >
            {showVideo ? (
              <>
                <span>Hide Video</span>
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                <span>Show Video</span>
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        {clips.map((clip) => {
          // Find current active clip
          const isActive = clip.title === activeVideo;

          return (
            <TabsContent key={clip.title} value={clip.title}>
              <div className="mb-3">
                <p className="text-sm text-muted-foreground">
                  {clip.description}
                </p>
              </div>

              {showVideo && (
                <div className="relative w-full max-w-3xl mx-auto">
                  {(!isPlaying || !isActive) && (
                    <div
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer z-10"
                      onClick={handlePlayPause}
                    >
                      <button
                        aria-label="Play video"
                        className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
                      >
                        <Play className="h-6 w-6 fill-current text-black" />
                      </button>
                    </div>
                  )}

                  {isActive && (
                    <video
                      ref={videoRef}
                      className="w-full rounded-lg shadow-md"
                      controls={isPlaying}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => setIsPlaying(false)}
                    >
                      <source src={clip.videoSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
