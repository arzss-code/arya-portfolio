import Link from "next/link";
import { HiOutlineArrowSmRight as ViewIcon } from "react-icons/hi";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("ProjectsPage");


  return (
    <Link href={`/projects/${slug}`} className="group flex h-full flex-col">
      <SpotlightCard className="relative flex h-full cursor-pointer flex-col p-2 hover:shadow-md">
        {/* Image Container with precise overflow hiding for the scale effect */}
        <div className="relative overflow-hidden rounded-xl">
          {is_featured && (
            <div className="absolute left-3 top-3 z-10 flex items-center gap-x-1.5 rounded-full border border-neutral-200/50 bg-white/80 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-neutral-800 shadow-sm backdrop-blur-md dark:border-neutral-700/50 dark:bg-neutral-900/80 dark:text-neutral-200">
              <PinIcon size={14} className="text-blue-500" />
              <span>Featured</span>
            </div>
          )}
          <Image
            src={image}
            alt={title}
            width={480}
            height={270}
            className="aspect-video w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col gap-4 px-3 py-5">
          <div className="space-y-2">
            <h3 className="flex items-center justify-between text-lg font-bold tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-blue-500 dark:text-neutral-100 dark:group-hover:text-blue-400">
              <span className="line-clamp-1">{title}</span>
              <ViewIcon
                size={20}
                className="-translate-x-2 text-neutral-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-blue-500 group-hover:opacity-100"
              />
            </h3>
            <p className="line-clamp-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {description}
            </p>
          </div>

          <div className="mt-auto pt-2">
            <div className="flex flex-wrap items-center gap-3">
              {stacks.map((stack: string, index: number) => {
                const stackData = STACKS[stack];

                if (!stackData) {
                  return null;
                }

                return (
                  <div
                    key={index}
                    title={stack}
                    className={`transition-transform duration-200 hover:scale-110 ${stackData.color}`}
                  >
                    {stackData.icon}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SpotlightCard>
    </Link>
  );
};

export default ProjectCard;
