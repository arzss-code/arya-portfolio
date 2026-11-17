import NextTopLoader from "nextjs-toploader";
import { getServerSession } from "next-auth";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider } from "next-intl";
import {
  getLocale,
  getMessages,
  getTranslations,
} from "next-intl/server";
import type { Metadata, Viewport } from "next";
import "./globals.css";

import Layouts from "@/common/components/layouts";
import ThemeProviderContext from "@/common/stores/theme";
import NextAuthProvider from "@/SessionProvider";
import {
  METADATA,
  METADATA_BASE_URL,
  SITE_URL,
} from "@/common/constants/metadata";
import { plusJakartaSans, manrope, dmSans } from "@/common/styles/fonts";
import { authOptions } from "@/common/libs/auth";
import { buildRootJsonLd, serializeJsonLd } from "@/common/libs/jsonLd";
import { CSPostHogProvider } from "@/common/libs/posthog";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const t = await getTranslations("HomePage");
  const defaultTitle = t("seoTitle");
  const defaultDescription = t("seoDescription");
  const ogLocale = locale === "en" ? "en_US" : "id_ID";
  const alternateLocale = locale === "en" ? ["id_ID"] : ["en_US"];
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

  return {
    metadataBase: METADATA_BASE_URL,
    title: {
      default: defaultTitle,
      template: `%s ${METADATA.exTitle}`,
    },
    description: defaultDescription,
    keywords: METADATA.keywords,
    applicationName: METADATA.openGraph.siteName,
    creator: METADATA.creator,
    publisher: METADATA.creator,
    authors: [
      {
        name: METADATA.creator,
        url: SITE_URL,
      },
    ],
    category: "technology",
    alternates: {
      canonical: SITE_URL,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    ...(googleVerification
      ? {
          verification: {
            google: googleVerification,
          },
        }
      : {}),
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/images/icon.webp", type: "image/webp" },
      ],
      apple: [{ url: "/images/icon.webp", type: "image/webp" }],
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      title: defaultTitle,
      description: defaultDescription,
      url: SITE_URL,
      siteName: METADATA.openGraph.siteName,
      locale: ogLocale,
      alternateLocale,
      type: "website",
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: defaultTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: defaultDescription,
      images: [`${SITE_URL}/opengraph-image`],
    },
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = await getTranslations("HomePage");
  const session = await getServerSession(authOptions);
  const rootJsonLd = buildRootJsonLd(locale, t("seoDescription"));

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <head>
        <meta httpEquiv="content-language" content={locale} />
        <link
          rel="preconnect"
          href="https://cqkstplcbucaqdbvmucx.supabase.co"
          crossOrigin=""
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(rootJsonLd),
          }}
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${manrope.variable} ${dmSans.variable} font-sans antialiased`}
      >
        <NextTopLoader
          color="#3b82f6"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #3b82f6,0 0 5px #60a5fa"
        />
        <NextIntlClientProvider messages={messages}>
          <NextAuthProvider session={session}>
            <CSPostHogProvider>
              <ThemeProviderContext>
                <Layouts>{children}</Layouts>
              </ThemeProviderContext>
            </CSPostHogProvider>
          </NextAuthProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
