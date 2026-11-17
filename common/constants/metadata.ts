export const DEFAULT_SITE_URL = "https://atsiilaarya.me";

const LEGACY_EXPIRED_HOSTS = new Set([
  "atsiilaarya.web.id",
  "www.atsiilaarya.web.id",
]);

export const normalizeSiteUrl = (rawUrl?: string): string => {
  if (!rawUrl || !rawUrl.trim()) {
    return DEFAULT_SITE_URL;
  }

  const trimmed = rawUrl.trim().replace(/\/+$/, "");
  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const parsed = new URL(withProtocol);
    if (LEGACY_EXPIRED_HOSTS.has(parsed.hostname.toLowerCase())) {
      return DEFAULT_SITE_URL;
    }
    return parsed.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
};

export const SITE_URL = normalizeSiteUrl(process.env.DOMAIN);

export const METADATA_BASE_URL = new URL(
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : SITE_URL,
);

export const SEO_KEYWORDS: string[] = [
  "Atsiila Arya Nabiih",
  "Arya Nabiih",
  "Arya Portfolio",
  "jasa website mranggen demak",
  "programmer mranggen demak",
  "jasa website mranggen",
  "jasa pembuatan website mranggen",
  "jasa website demak",
  "jasa pembuatan website demak",
  "web developer mranggen demak",
  "jasa website semarang",
  "jasa pembuatan website semarang",
  "jasa bikin website semarang",
  "programmer semarang",
  "freelance web developer semarang",
  "jasa pembuatan landing page semarang demak",
  "jasa website umkm semarang demak",
  "jasa desain ui/ux semarang",
  "Frontend Developer Indonesia",
  "Frontend Developer Semarang",
  "UI/UX Designer Indonesia",
  "UI/UX Designer Semarang",
  "Next.js Developer",
  "React Developer",
  "TypeScript Developer",
  "Freelance Web Developer Indonesia",
  "Jasa Pembuatan Website",
  "Politeknik Negeri Semarang",
];

export const SERVICE_AREAS: string[] = [
  "Mranggen",
  "Demak",
  "Semarang",
  "Pedurungan",
  "Tembalang",
  "Ungaran",
  "Jawa Tengah",
  "Indonesia",
];

export const METADATA = {
  creator: "Atsiila Arya Nabiih",
  shortName: "Arya",
  role: "Frontend Developer & UI/UX Designer",
  description:
    "Portofolio resmi Atsiila Arya Nabiih, Frontend Developer & UI/UX Designer asal Semarang. Membangun aplikasi web modern dengan Next.js, React, TypeScript & Figma.",
  keyword: SEO_KEYWORDS.join(", "),
  keywords: SEO_KEYWORDS,
  authors: {
    name: "Atsiila Arya Nabiih",
    url: SITE_URL,
  },
  openGraph: {
    url: SITE_URL,
    siteName: "Atsiila Arya Nabiih",
    locale: "id_ID",
    alternateLocale: ["en_US"],
  },
  exTitle: "| Atsiila Arya Nabiih",
  profile: "/images/Profil-Arya-1.webp",
  icon: "/images/icon.webp",
  email: "atsiilaarya14@gmail.com",
  location: {
    city: "Semarang",
    region: "Central Java",
    country: "ID",
  },
  sameAs: [
    "https://github.com/arzss-code",
    "https://www.linkedin.com/in/atsiila-arya-nabiih",
    "https://www.instagram.com/atsiila.arya14/",
  ],
};
