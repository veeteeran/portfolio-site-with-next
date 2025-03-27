// src/components/VideoPlayer.tsx
"use client";
import React, { useRef, useState, useEffect } from "react";

interface VideoPlayerProps {
  videoSrc: string;
  title?: string;
}

export default function VideoPlayer({ videoSrc, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
      setIsPlaying(false);
    }
  }, [videoSrc]);

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="black"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
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
