import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import BackButton from "@/common/components/elements/BackButton";
import Container from "@/common/components/elements/Container";
import { METADATA } from "@/common/constants/metadata";
import {
  buildProjectDetailJsonLd,
  serializeJsonLd,
} from "@/common/libs/jsonLd";
import { buildPageMetadata } from "@/common/libs/seo";
import { ProjectItem } from "@/common/types/projects";
import ProjectDetail from "@/modules/projects/components/ProjectDetail";
import { getProjectsDataBySlug } from "@/services/projects";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

const getProjectDetail = cache(
  async (slug: string): Promise<ProjectItem | null> => {
    const project = await getProjectsDataBySlug(slug);
    if (!project || !project.is_show) {
      return null;
    }

    // Menggunakan content langsung dari Supabase (project.content)
    return JSON.parse(JSON.stringify(project)) as ProjectItem;
  },
);

export const generateMetadata = async ({
  params,
}: ProjectDetailPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const locale = await getLocale();
  const project = await getProjectDetail(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildPageMetadata({
    title: project.title,
    description: project.description,
    pathname: `/projects/${project.slug}`,
    locale,
    image: project.image,
    type: "article",
    keywords: [
      project.title,
      ...(project.stacks ?? []),
      METADATA.creator,
      METADATA.role,
    ],
  });
};

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const { slug } = await params;
  const data = await getProjectDetail(slug);

  if (!data) {
    notFound();
  }

  const locale = await getLocale();
  const t = await getTranslations("ProjectsPage");
  const projectJsonLd = buildProjectDetailJsonLd(data, locale, t("title"));

  return (
    <Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(projectJsonLd),
        }}
      />
      <BackButton url="/projects" />
      <ProjectDetail {...data} />
    </Container>
  );
};

export default ProjectDetailPage;
