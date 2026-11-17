import { EDUCATION } from "@/common/constants/education";
import {
  METADATA,
  SERVICE_AREAS,
  SITE_URL,
} from "@/common/constants/metadata";
import { ProjectItem } from "@/common/types/projects";
import { buildCanonicalUrl, resolveAbsoluteAssetUrl } from "@/common/libs/seo";

export interface BreadcrumbEntry {
  name: string;
  pathname: string;
}

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PROFILE_PAGE_ID = `${SITE_URL}/#profilepage`;
const SERVICE_ID = `${SITE_URL}/#service`;

const CORE_SKILLS: string[] = [
  "Frontend Web Development",
  "UI/UX Design",
  "Next.js",
  "React.js",
  "TypeScript",
  "Tailwind CSS",
  "Laravel",
  "Flutter",
  "Supabase",
  "PostgreSQL",
  "Figma",
];

export const serializeJsonLd = (schema: Record<string, unknown>): string => {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
};

export const buildRootJsonLd = (
  locale: string,
  description: string,
): Record<string, unknown> => {
  const inLanguage = locale === "en" ? "en-US" : "id-ID";
  const primaryEducation = EDUCATION[0];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: METADATA.openGraph.siteName,
        alternateName: ["Arya Portfolio", "Atsiila Arya Nabiih Portfolio"],
        description,
        inLanguage,
        publisher: {
          "@id": PERSON_ID,
        },
      },
      {
        "@type": "ProfilePage",
        "@id": PROFILE_PAGE_ID,
        url: SITE_URL,
        name: `${METADATA.creator} — ${METADATA.role}`,
        description,
        inLanguage,
        isPartOf: {
          "@id": WEBSITE_ID,
        },
        mainEntity: {
          "@id": PERSON_ID,
        },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: METADATA.creator,
        alternateName: METADATA.shortName,
        givenName: "Atsiila Arya",
        familyName: "Nabiih",
        jobTitle: METADATA.role,
        description,
        url: SITE_URL,
        image: resolveAbsoluteAssetUrl(METADATA.profile),
        email: `mailto:${METADATA.email}`,
        nationality: {
          "@type": "Country",
          name: "Indonesia",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: METADATA.location.city,
          addressRegion: METADATA.location.region,
          addressCountry: METADATA.location.country,
        },
        ...(primaryEducation
          ? {
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: primaryEducation.school,
                url: primaryEducation.link,
              },
            }
          : {}),
        knowsAbout: CORE_SKILLS,
        knowsLanguage: ["id", "en"],
        sameAs: METADATA.sameAs,
      },
      {
        "@type": "Service",
        "@id": SERVICE_ID,
        name: `Jasa Pembuatan Website & Desain UI/UX — ${METADATA.creator}`,
        description:
          "Layanan jasa pembuatan website profesional, landing page bisnis & UMKM, aplikasi web kustom (Next.js, React, Laravel), serta desain UI/UX di area Mranggen, Demak, Semarang, dan seluruh Indonesia.",
        url: `${SITE_URL}/contact`,
        provider: {
          "@id": PERSON_ID,
        },
        serviceType: [
          "Jasa Pembuatan Website",
          "Frontend Web Development",
          "Custom Web Application",
          "Landing Page Bisnis & UMKM",
          "UI/UX Design",
        ],
        areaServed: SERVICE_AREAS.map((area) => ({
          "@type": "AdministrativeArea",
          name: area,
        })),
      },
    ],
  };
};

export const buildBreadcrumbJsonLd = (
  items: BreadcrumbEntry[],
): Record<string, unknown> => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildCanonicalUrl(item.pathname),
    })),
  };
};

export const buildProjectsCollectionJsonLd = (
  projects: ProjectItem[],
  locale: string,
  title: string,
  description: string,
): Record<string, unknown> => {
  const inLanguage = locale === "en" ? "en-US" : "id-ID";
  const visibleProjects = projects.filter(
    (project) => project?.is_show && Boolean(project?.slug),
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/projects#collection`,
        url: `${SITE_URL}/projects`,
        name: `${title} ${METADATA.exTitle}`,
        description,
        inLanguage,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: visibleProjects.length,
          itemListElement: visibleProjects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: project.title,
            url: buildCanonicalUrl(`/projects/${project.slug}`),
          })),
        },
      },
      buildBreadcrumbJsonLd([
        { name: locale === "en" ? "Home" : "Beranda", pathname: "/" },
        { name: title, pathname: "/projects" },
      ]),
    ],
  };
};

export const buildProjectDetailJsonLd = (
  project: ProjectItem,
  locale: string,
  projectsLabel: string,
): Record<string, unknown> => {
  const inLanguage = locale === "en" ? "en-US" : "id-ID";
  const projectUrl = buildCanonicalUrl(`/projects/${project.slug}`);
  const hasSourceRepo = Boolean(project.link_github);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": hasSourceRepo ? "SoftwareSourceCode" : "CreativeWork",
        "@id": `${projectUrl}#work`,
        name: project.title,
        headline: project.title,
        description: project.description,
        url: projectUrl,
        image: resolveAbsoluteAssetUrl(project.image),
        inLanguage,
        author: {
          "@id": PERSON_ID,
        },
        creator: {
          "@id": PERSON_ID,
        },
        ...(project.year ? { dateCreated: String(project.year) } : {}),
        ...(project.stacks?.length
          ? { keywords: project.stacks.join(", ") }
          : {}),
        ...(project.link_github ? { codeRepository: project.link_github } : {}),
        ...(project.link_demo ? { targetProduct: project.link_demo } : {}),
      },
      buildBreadcrumbJsonLd([
        { name: locale === "en" ? "Home" : "Beranda", pathname: "/" },
        { name: projectsLabel, pathname: "/projects" },
        { name: project.title, pathname: `/projects/${project.slug}` },
      ]),
    ],
  };
};
