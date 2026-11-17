import { NextResponse } from "next/server";

import { CAREERS } from "@/common/constants/carreers";
import { EDUCATION } from "@/common/constants/education";
import {
  METADATA,
  SERVICE_AREAS,
  SITE_URL,
} from "@/common/constants/metadata";
import { getPublicProjectsData } from "@/services/projects";

export const revalidate = 3600;

export const GET = async () => {
  const projects = await getPublicProjectsData();

  const projectLines =
    projects.length > 0
      ? projects
          .filter((project) => Boolean(project?.slug))
          .map(
            (project) =>
              `- [${project.title}](${SITE_URL}/projects/${project.slug}): ${project.description}`,
          )
          .join("\n")
      : `- [Projects Showcase](${SITE_URL}/projects): Curated web, mobile, and UI/UX engineering case studies.`;

  const careerLines = CAREERS.filter((career) => career.isShow)
    .map(
      (career) =>
        `- **${career.position}** at ${career.company} (${career.start_date} – ${career.end_date ?? "Present"})`,
    )
    .join("\n");

  const educationLines = EDUCATION.map(
    (edu) =>
      `- **${edu.degree} in ${edu.major}** — ${edu.school} (${edu.start_year}–${edu.end_year})`,
  ).join("\n");

  const body = [
    `# ${METADATA.creator}`,
    "",
    `> ${METADATA.role} based in ${METADATA.location.city}, ${METADATA.location.region}, Indonesia. Building modern, accessible, and performant web applications with Next.js, React, TypeScript, Tailwind CSS, Laravel, Flutter, and Figma.`,
    "",
    "## Primary Pages",
    `- [Home](${SITE_URL}): Overview, technical stack, featured work, and freelance availability.`,
    `- [About](${SITE_URL}/about): Biography, professional experience, education, and downloadable CV.`,
    `- [Projects](${SITE_URL}/projects): Full case studies of web, mobile, and UI/UX projects.`,
    `- [Achievements](${SITE_URL}/achievements): Certifications, awards, and credentials.`,
    `- [Dashboard](${SITE_URL}/dashboard): Open-source GitHub contribution metrics and portfolio analytics.`,
    `- [Contact](${SITE_URL}/contact): Direct contact channels and collaboration inquiry form.`,
    "",
    "## Selected Projects",
    projectLines,
    "",
    "## Experience",
    careerLines,
    "",
    "## Education",
    educationLines,
    "",
    "## Freelance Services & Local Coverage",
    "- Services: Website creation (Jasa Pembuatan Website), company profile & UMKM landing pages, custom full-stack web apps (Next.js, React, Laravel, Supabase), and Figma UI/UX design.",
    `- Local Service Areas: ${SERVICE_AREAS.join(", ")} (onsite/hybrid around Mranggen, Demak, and Semarang; remote worldwide).`,
    "",
    "## Profiles & Contact",
    `- Email: mailto:${METADATA.email}`,
    ...METADATA.sameAs.map((url) => `- ${url}`),
    "",
  ].join("\n");

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
};
