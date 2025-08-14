import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fast-trip",
    short_name: "Fast-trip",
    description: "A Progressive Web App Fast-trip",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "/icons/icon-310x310.png",
        sizes: "310x310",
        type: "image/png",
      },
    ],
  };
}
