"use client";

import { useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import Button from "@/common/components/elements/Button";
import Image from "@/common/components/elements/Image";
import { ProjectItem } from "@/common/types/projects";

type ProjectGalleryProps = {
  images: ProjectItem["gallery"];
  title: string;
};

const ProjectGallery = ({ images, title }: ProjectGalleryProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
  }, [images]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -clientWidth : clientWidth,
      behavior: "smooth",
    });
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="mt-16 space-y-6 border-t border-neutral-200 pt-12 dark:border-neutral-800">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Project Gallery
        </h2>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            shape="pill"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous gallery image"
          >
            <FiChevronLeft
              size={18}
              aria-hidden="true"
              className="text-neutral-700 dark:text-neutral-200"
            />
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            shape="pill"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Next gallery image"
          >
            <FiChevronRight
              size={18}
              aria-hidden="true"
              className="text-neutral-700 dark:text-neutral-200"
            />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        role="region"
        aria-label={`${title} image gallery`}
        tabIndex={0}
        className="flex w-full snap-x snap-mandatory overflow-x-auto rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, index) => (
          <div key={index} className="w-full shrink-0 snap-center px-1">
            <div className="overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900">
              <Image
                src={src}
                alt={`${title} screenshot ${index + 1}`}
                width={1200}
                height={675}
                sizes="(max-width: 768px) 100vw, 900px"
                className="aspect-video w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;
