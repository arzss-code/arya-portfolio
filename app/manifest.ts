import type { MetadataRoute } from "next";

import { METADATA } from "@/common/constants/metadata";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${METADATA.creator} — ${METADATA.role}`,
    short_name: METADATA.creator,
    description: METADATA.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/images/icon.webp",
        sizes: "1440x1440",
        type: "image/webp",
      },
    ],
  };
}
