"use client";

import { useRef, useState, useEffect } from "react";
import Image from "@/common/components/elements/Image";
import { ProjectItem } from "@/common/types/projects";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type ProjectGalleryProps = {
  images: ProjectItem["gallery"];
  title: string;
};

const ProjectGallery = ({ images, title }: ProjectGalleryProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
  }, [images]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -clientWidth : clientWidth,
        behavior: "smooth",
      });
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-6 pt-12 border-t border-neutral-200 dark:border-neutral-800 mt-16">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Project Gallery
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="p-2 rounded-full border border-neutral-300 dark:border-neutral-700 disabled:opacity-30 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95"
            aria-label="Previous image"
          >
            <FiChevronLeft size={20} className="text-neutral-700 dark:text-neutral-300" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="p-2 rounded-full border border-neutral-300 dark:border-neutral-700 disabled:opacity-30 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95"
            aria-label="Next image"
          >
            <FiChevronRight size={20} className="text-neutral-700 dark:text-neutral-300" />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex snap-x snap-mandatory overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
      >
        {images.map((src, index) => (
          <div key={index} className="w-full shrink-0 snap-center px-1">
            <div className="overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900">
              <Image
                src={src}
                alt={`${title} gallery image ${index + 1}`}
                width={1200}
                height={675}
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
