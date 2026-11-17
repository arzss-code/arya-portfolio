import type { Metadata } from "next";

import { METADATA, SITE_URL } from "@/common/constants/metadata";

interface BuildPageMetadataOptions {
  title: string;
  description: string;
  pathname: string;
  locale?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  keywords?: string[];
  absoluteTitle?: boolean;
}

export const buildCanonicalUrl = (pathname: string): string => {
  if (!pathname || pathname === "/") {
    return SITE_URL;
  }

  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${normalizedPath.replace(/\/+$/, "")}`;
};

export const resolveAbsoluteAssetUrl = (assetPath?: string): string => {
  if (!assetPath) {
    return `${SITE_URL}/opengraph-image`;
  }

  if (/^https?:\/\//i.test(assetPath)) {
    return assetPath;
  }

  const normalized = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  return `${SITE_URL}${normalized}`;
};

export const buildPageMetadata = ({
  title,
  description,
  pathname,
  locale = "id",
  image,
  type = "website",
  keywords,
  absoluteTitle = false,
}: BuildPageMetadataOptions): Metadata => {
  const canonicalUrl = buildCanonicalUrl(pathname);
  const ogLocale = locale === "en" ? "en_US" : "id_ID";
  const alternateLocale = locale === "en" ? ["id_ID"] : ["en_US"];
  const fullTitle = absoluteTitle ? title : `${title} ${METADATA.exTitle}`;
  const ogImageUrl = image
    ? resolveAbsoluteAssetUrl(image)
    : `${SITE_URL}/opengraph-image`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywords && keywords.length > 0 ? keywords : METADATA.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: METADATA.openGraph.siteName,
      locale: ogLocale,
      alternateLocale,
      type,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImageUrl],
    },
  };
};
