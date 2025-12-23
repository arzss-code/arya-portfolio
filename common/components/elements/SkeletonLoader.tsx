"use client";

import { useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";
import { SkeletonTheme } from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonLoaderProps {
  children: ReactNode;
}

const SkeletonLoader = ({ children }: SkeletonLoaderProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use fixed colors before mount to avoid hydration mismatch
  const baseColor = mounted
    ? resolvedTheme === "light"
      ? "#ebebeb"
      : "#202020"
    : "#ebebeb";
  
  const highlightColor = mounted
    ? resolvedTheme === "light"
      ? "#f5f5f5"
      : "#2e2e2e"
    : "#f5f5f5";

  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      {children}
    </SkeletonTheme>
  );
};

export default SkeletonLoader;
