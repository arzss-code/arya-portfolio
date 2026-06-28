import { useTranslations } from "next-intl";

import Tooltip from "@/common/components/elements/Tooltip";
import Image from "@/common/components/elements/Image";
import MDXComponent from "@/common/components/elements/MDXComponent";
import { ProjectItem } from "@/common/types/projects";
import { STACKS } from "@/common/constants/stacks";

import ProjectLink from "./ProjectLink";
import ProjectGallery from "./detail/ProjectGallery";

const ProjectDetail = ({
  title,
  image,
  description,
  stacks,
  link_demo,
  link_github,
  content,
  role,
  project_type,
  year,
  highlight,
  gallery,
}: ProjectItem) => {
  const t = useTranslations("ProjectsPage");

  const displayCategory = project_type || "Case Study";

  return (
    <article className="space-y-8 md:space-y-10">
      
      {/* 0. Header (Category Badge, Year Badge, Highlight Badge, Title, Description) */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
            {displayCategory}
          </span>
          {year ? (
            <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              {year}
            </span>
          ) : null}
          {highlight ? (
            <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-400">
              {highlight}
            </span>
          ) : null}
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="max-w-[65ch] text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        )}
      </div>

      {/* 1. Info Grid (Role, Tech Stack, Links) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-y border-neutral-200 py-4 dark:border-neutral-800">
        
        {/* Role Info */}
        <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-4">
          <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            {t("role")}
          </span>
          <p className="text-neutral-900 dark:text-neutral-100 font-medium">
            {role || "-"}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="md:col-span-4 lg:col-span-6 flex flex-col gap-4">
          <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            {t("tech_stack")}
          </span>
          <div className="flex flex-wrap items-center gap-4">
            {stacks.map((stack: string, index: number) => {
              const stackData = STACKS[stack];
              if (!stackData) return null;
              return (
                <Tooltip title={stack} key={index}>
                  <div className={`transition-transform duration-300 hover:scale-110 ${stackData.color}`}>
                    {stackData.icon}
                  </div>
                </Tooltip>
              );
            })}
          </div>
        </div>

        {/* Links */}
        <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-4">
          <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            Links
          </span>
          <ProjectLink
            title={title}
            link_demo={link_demo || ""}
            link_github={link_github || ""}
          />
        </div>

      </div>

      {/* 2. Main Hero Asset */}
      <div className="overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900">
        <Image
          src={image}
          alt={title}
          width={1200}
          height={675}
          priority
          className="aspect-video w-full object-cover"
        />
      </div>

      {/* 3. Main Content (Teks & Deskripsi) */}
      {content ? (
        <div className="w-full space-y-6 leading-relaxed text-neutral-800 dark:text-neutral-300 md:text-lg">
          <MDXComponent>{content}</MDXComponent>
        </div>
      ) : null}

      {/* 4. Gallery Carousel */}
      <ProjectGallery images={gallery} title={title} />
      
    </article>
  );
};

export default ProjectDetail;
