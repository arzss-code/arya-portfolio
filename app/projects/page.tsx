import { Suspense } from "react";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import {
  buildProjectsCollectionJsonLd,
  serializeJsonLd,
} from "@/common/libs/jsonLd";
import { buildPageMetadata } from "@/common/libs/seo";
import Projects from "@/modules/projects";
import ProjectSkeleton from "@/modules/projects/components/ProjectSkeleton";
import { getPublicProjectsData } from "@/services/projects";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const t = await getTranslations("ProjectsPage");

  return buildPageMetadata({
    title: t("title"),
    description: t("seoDescription"),
    pathname: "/projects",
    locale,
  });
};

const ProjectsFallback = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {[...Array(4)].map((_, index) => (
      <ProjectSkeleton key={index} />
    ))}
  </div>
);

const ProjectsPage = async () => {
  const locale = await getLocale();
  const t = await getTranslations("ProjectsPage");
  const initialProjects = await getPublicProjectsData();

  const collectionJsonLd = buildProjectsCollectionJsonLd(
    initialProjects,
    locale,
    t("title"),
    t("seoDescription"),
  );

  return (
    <Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(collectionJsonLd),
        }}
      />
      <PageHeading title={t("title")} description={t("description")} />
      <Suspense fallback={<ProjectsFallback />}>
        <Projects initialData={initialProjects} />
      </Suspense>
    </Container>
  );
};

export default ProjectsPage;
