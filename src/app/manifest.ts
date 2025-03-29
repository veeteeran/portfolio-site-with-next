import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Viet Tran | Software Engineer",
    short_name: "Viet Tran",
    description:
      "Portfolio site of Viet Tran, a Software Engineer specializing in TypeScript, React, and Node.js",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#181818",
    icons: [
      {
        src: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
