"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import useSWR from "swr";

import Button from "@/common/components/elements/Button";
import Image from "@/common/components/elements/Image";
import { ProjectItem } from "@/common/types/projects";
import { fetcher } from "@/services/fetcher";

const ProjectsCarousel = () => {
  const { data } = useSWR("/api/projects", fetcher, {
    revalidateOnFocus: false,
  });
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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

  useEffect(() => {
    if (projects.length < 2 || isPaused || shouldReduceMotion) return;
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [goNext, projects.length, isPaused, shouldReduceMotion]);

  if (!projects.length) {
    return (
      <div className="flex h-[220px] items-center justify-center">
        <div
          aria-hidden="true"
          className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-blue-500"
        />
        <span className="sr-only">Loading featured projects…</span>
      </div>
    );
  }

  return (
    <div
      className="relative flex w-full flex-col items-center gap-4 py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Carousel stage */}
      <div
        className="relative flex w-full items-center justify-center overflow-hidden py-8"
        style={{ perspective: "900px" }}
      >
        <div className="aspect-video w-[60%]" aria-hidden="true" />

        {visibleIndexes.map((index) => {
          const project = projects[index];
          const pos = getCardPosition(index);
          const isCenter = pos === "center";

          return (
            <motion.div
              key={project.id}
              className="absolute w-[60%] rounded-2xl"
              variants={cardVariants}
              animate={pos}
              initial={false}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.42,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {isCenter ? (
                <Link
                  href={`/projects/${project.slug}`}
                  aria-label={`View project ${project.title}`}
                  className="block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  <div className="group relative aspect-video overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/15">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={360}
                      height={200}
                      sizes="(max-width: 768px) 60vw, 360px"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-end rounded-2xl bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <p className="line-clamp-1 text-xs font-semibold leading-tight text-white">
                        {project.title}
                      </p>
                    </div>
                  </div>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => (pos === "left" ? goPrev() : goNext())}
                  aria-label={`Preview ${project.title}`}
                  className="block w-full cursor-pointer rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  <div className="relative aspect-video overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/10">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={360}
                      height={200}
                      sizes="(max-width: 768px) 45vw, 280px"
                      className="h-full w-full object-cover"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-black/45"
                      aria-hidden="true"
                    />
                  </div>
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Controls row */}
      <div className="flex w-full items-center justify-between px-4">
        <div className="flex items-center gap-1.5">
          {projects.map((project, i) => {
            const isSelected = i === activeIndex;
            return (
              <button
                key={project.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  setDirection(i > activeIndex ? 1 : -1);
                  setActiveIndex(i);
                }}
                aria-label={`Show project ${i + 1}: ${project.title}`}
                className="group flex h-6 items-center px-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                <span
                  className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                    isSelected
                      ? "w-5 bg-blue-500"
                      : "w-1.5 bg-neutral-400/60 group-hover:bg-neutral-500 dark:bg-neutral-600 dark:group-hover:bg-neutral-400"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="flex gap-1.5">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            shape="pill"
            onClick={goPrev}
            aria-label="Previous project slide"
            className="h-8 w-8"
          >
            <HiChevronLeft size={16} aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            shape="pill"
            onClick={goNext}
            aria-label="Next project slide"
            className="h-8 w-8"
          >
            <HiChevronRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProjectsCarousel);
