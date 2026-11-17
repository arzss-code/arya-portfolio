import type { MetadataRoute } from "next";

import { SITE_URL } from "@/common/constants/metadata";
import { getPublicProjectsData } from "@/services/projects";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/achievements`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/dashboard`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.65,
    },
  ];

  const projects = await getPublicProjectsData();

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((project) => Boolean(project?.slug))
    .map((project) => ({
      url: `${SITE_URL}/projects/${encodeURIComponent(project.slug)}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: project.is_featured ? 0.85 : 0.75,
    }));

  return [...staticRoutes, ...projectRoutes];
}
