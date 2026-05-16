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
    <Link href={`/projects/${slug}`} className="flex h-full flex-col">
      <SpotlightCard className="group relative flex h-full cursor-pointer flex-col hover:shadow-sm">
        {is_featured && (
          <div className="absolute right-0 top-0 z-10 flex items-center gap-x-1 rounded-bl-lg rounded-tr-lg bg-blue-500 px-2 py-1 text-sm font-medium text-neutral-50">
            <PinIcon size={15} />
            <span>Featured</span>
          </div>
        )}
        <div className="relative">
          <Image
            src={image}
            alt={title}
            width={480}
            height={270}
            className="aspect-video w-full rounded-t-xl object-cover"
          />
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center gap-1 rounded-t-xl bg-black text-sm font-medium text-neutral-50 opacity-0 transition-opacity duration-300 group-hover:opacity-80">
            <span>{t("view_project")}</span>
            <ViewIcon size={20} />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="space-y-1.5">
            <h3 className="cursor-pointer text-lg font-semibold leading-snug tracking-tight text-neutral-800 transition-all duration-300 group-hover:text-blue-500 dark:text-neutral-200 dark:group-hover:text-blue-400">
              {title}
            </h3>
            <p className="line-clamp-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              {description}
            </p>
          </div>
          <div className="mt-auto border-t border-neutral-100 pt-3 dark:border-neutral-800">
            <div className="flex flex-wrap items-center gap-2.5">
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
