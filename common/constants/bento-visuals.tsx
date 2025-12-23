"use client";

import dynamic from "next/dynamic";

export const AnimatedListProject = dynamic(
  () => import("@/modules/home/components/Bento/AnimatedListProject"),
  { ssr: false },
);
export const StackImagesPersonal = dynamic(
  () => import("@/modules/home/components/Bento/StackImagesPersonal"),
  { ssr: false },
);
export const TrueFocusService = dynamic(
  () => import("@/modules/home/components/Bento/TrueFocusService"),
  { ssr: false },
);
