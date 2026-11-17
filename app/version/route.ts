import { NextResponse } from "next/server";

import versionManifest from "@/version.json";

export const GET = async () => {
  return NextResponse.json(versionManifest, {
    status: 200,
    headers: {
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "public, max-age=60",
    },
  });
};
