import Link from "next/link";
import { HiOutlineArrowSmRight as ViewIcon } from "react-icons/hi";
import { TbPinnedFilled as PinIcon } from "react-icons/tb";

import Image from "@/common/components/elements/Image";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { ProjectItem } from "@/common/types/projects";
import { STACKS } from "@/common/constants/stacks";

const ProjectCard = ({
  title,
  slug,
  description,
  image,
  stacks,
  is_featured,
}: ProjectItem) => {
  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex h-full flex-col rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
    >
      <SpotlightCard className="relative flex h-full cursor-pointer flex-col p-2 transition-shadow duration-300 hover:shadow-md">
        <div className="relative overflow-hidden rounded-xl">
          {is_featured && (
            <div className="surface-tactile-pill absolute left-3 top-3 z-10 flex items-center gap-x-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide text-neutral-800 backdrop-blur-md dark:text-neutral-200">
              <PinIcon size={14} aria-hidden="true" className="text-blue-500" />
              <span>Featured</span>
            </div>
          )}
          <Image
            src={image}
            alt={title}
            width={480}
            height={270}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
            className="aspect-video w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col gap-4 px-3 py-5">
          <div className="space-y-2">
            <h2 className="flex items-center justify-between gap-2 text-lg font-bold tracking-tight text-neutral-900 transition-colors duration-200 group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400">
              <span className="min-w-0 line-clamp-1">{title}</span>
              <ViewIcon
                size={20}
                aria-hidden="true"
                className="shrink-0 -translate-x-2 text-neutral-400 opacity-0 transition-[transform,opacity,color] duration-200 group-hover:translate-x-0 group-hover:text-blue-500 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
              />
            </h2>
            <p className="line-clamp-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {description}
            </p>
          </div>

          <div className="mt-auto pt-2">
            <ul className="flex flex-wrap items-center gap-3" aria-label="Tech stack">
              {stacks.map((stack: string, index: number) => {
                const stackData = STACKS[stack];
                if (!stackData) return null;

                return (
                  <li
                    key={index}
                    className={`transition-transform duration-200 hover:scale-110 ${stackData.color}`}
                  >
                    <span aria-hidden="true">{stackData.icon}</span>
                    <span className="sr-only">{stack}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </SpotlightCard>
    </Link>
  );
};

export default ProjectCard;
