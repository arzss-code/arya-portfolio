"use client";

import clsx from "clsx";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { useState } from "react";

interface ImageProps extends NextImageProps {
  rounded?: string;
}

const Image = (props: ImageProps) => {
  const { alt, src, className, rounded, priority, quality = 85, ...rest } = props;
  const [isLoading, setLoading] = useState(!priority);

  if (!src) return null; // Handle missing or empty src

  return (
    <div
      className={clsx(
        "relative overflow-hidden",
        isLoading && !priority ? "animate-pulse" : "",
        rounded,
        className?.includes("h-full") && "h-full",
        className?.includes("w-full") && "w-full",
      )}
    >
      <NextImage
        className={clsx(
          "transition-[transform,filter,opacity] duration-500 ease-out",
          isLoading && !priority
            ? "scale-[1.02] blur-xl grayscale"
            : "scale-100 blur-0 grayscale-0",
          rounded,
          className,
        )}
        src={src}
        alt={alt}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? "eager" : "lazy"}
        quality={quality}
        onLoad={() => setLoading(false)}
        {...rest}
      />
    </div>
  );
};

export default Image;
