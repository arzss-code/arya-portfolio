"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import useSWR from "swr";

import Image from "@/common/components/elements/Image";
import { ProjectItem } from "@/common/types/projects";
import { fetcher } from "@/services/fetcher";

const ProjectsCarousel = () => {
  const { data } = useSWR("/api/projects", fetcher);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const projects: ProjectItem[] = useMemo(() => {
    return (
      data
        ?.filter((item: ProjectItem) => item?.is_show && item?.image)
        .sort((a: ProjectItem, b: ProjectItem) => b.id - a.id)
        .slice(0, 6) ?? []
    );
  }, [data]);

  const getCardPosition = useCallback(
    (index: number) => {
      const len = projects.length;
      if (!len) return "hidden";
      const diff = (index - activeIndex + len) % len;
      if (diff === 0) return "center";
      if (diff === 1 || diff === len - 1) return diff === 1 ? "right" : "left";
      return "hidden";
    },
    [activeIndex, projects.length],
  );

  const cardVariants = useMemo(
    () => ({
      center: {
        x: 0,
        scale: 1,
        zIndex: 10,
        opacity: 1,
      },
      left: {
        x: "-52%",
        scale: 0.78,
        zIndex: 5,
        opacity: 0.65,
      },
      right: {
        x: "52%",
        scale: 0.78,
        zIndex: 5,
        opacity: 0.65,
      },
      hidden: {
        x: direction > 0 ? "110%" : "-110%",
        scale: 0.5,
        zIndex: 0,
        opacity: 0,
      },
    }),
    [direction],
  );

  const visibleIndexes = useMemo(() => {
    const len = projects.length;
    if (!len) return [] as number[];
    if (len <= 3) return projects.map((_, i) => i);
    const prev = (activeIndex - 1 + len) % len;
    const next = (activeIndex + 1) % len;
    return Array.from(new Set([prev, activeIndex, next]));
  }, [projects, activeIndex]);

  const goNext = useCallback(() => {
    if (!projects.length) return;
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const goPrev = useCallback(() => {
    if (!projects.length) return;
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  // Auto-rotate every 3.5 seconds, pause on hover
  useEffect(() => {
    if (projects.length < 2 || isHovered) return;
    const timer = setInterval(goNext, 3500);
    return () => clearInterval(timer);
  }, [goNext, projects.length, isHovered]);

  if (!projects.length) {
    return (
      <div className="flex h-[220px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-blue-500" />
      </div>
    );
  }

  return (
    <div className="relative flex w-full flex-col items-center gap-4 py-4">
      {/* Carousel stage */}
      <div
        className="relative flex w-full items-center justify-center overflow-hidden py-8"
        style={{ perspective: "900px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hidden spacer to maintain responsive height */}
        <div className="aspect-video w-[60%]" aria-hidden="true" />

        {visibleIndexes.map((index) => {
          const project = projects[index];
          const pos = getCardPosition(index);
          return (
            <motion.div
              key={project.id}
              className="absolute w-[60%] cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              variants={cardVariants}
              animate={pos}
              initial={false}
              transition={{
                duration: 0.45,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              role="button"
              tabIndex={pos !== "hidden" ? 0 : -1}
              aria-label={`Project ${project.title}`}
              onClick={() => {
                if (pos === "left") goPrev();
                else if (pos === "right") goNext();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (pos === "left") goPrev();
                  else if (pos === "right") goNext();
                  else if (pos === "center") document.getElementById(`link-${project.slug}`)?.click();
                } else if (e.key === "ArrowLeft") {
                  goPrev();
                } else if (e.key === "ArrowRight") {
                  goNext();
                }
              }}
              onFocus={() => setIsHovered(true)}
              onBlur={() => setIsHovered(false)}
            >
              <Link
                id={`link-${project.slug}`}
                href={`/projects/${project.slug}`}
                onClick={(e) => pos !== "center" && e.preventDefault()}
                tabIndex={-1}
                className="block"
              >
                <div className="group relative aspect-video overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/10">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={360}
                    height={200}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay replacing filter: brightness() */}
                  <div 
                    className={`pointer-events-none absolute inset-0 bg-black/40 transition-opacity duration-300 ${pos === "center" ? "opacity-0" : "opacity-100"}`} 
                    aria-hidden="true" 
                  />
                  <div className="absolute inset-0 flex items-end rounded-2xl bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="line-clamp-1 text-xs font-semibold leading-tight text-white">
                      {project.title}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Title + controls row */}
      <div className="flex w-full items-center justify-between px-4">
        {/* Dot indicators */}
        <div className="flex gap-1.5" role="tablist">
          {projects.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              onClick={() => {
                setDirection(i > activeIndex ? 1 : -1);
                setActiveIndex(i);
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-[width,background-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900 ${
                i === activeIndex
                  ? "w-5 bg-blue-500"
                  : "w-1.5 bg-neutral-400/50 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>

        {/* Prev / Next buttons */}
        <div className="flex gap-1.5">
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-neutral-700 backdrop-blur-sm transition duration-200 hover:scale-110 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-neutral-300"
          >
            <HiChevronLeft size={16} />
          </button>
          <button
            onClick={goNext}
            aria-label="Next slide"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-neutral-700 backdrop-blur-sm transition duration-200 hover:scale-110 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-neutral-300"
          >
            <HiChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProjectsCarousel);
