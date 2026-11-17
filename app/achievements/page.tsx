import { Suspense } from "react";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import { buildBreadcrumbJsonLd, serializeJsonLd } from "@/common/libs/jsonLd";
import { buildPageMetadata } from "@/common/libs/seo";
import Achievements from "@/modules/achievements";
import AchievementSkeleton from "@/modules/achievements/components/AchievementSkeleton";
import { getPublicAchievementsData } from "@/services/achievements";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const t = await getTranslations("AchievementsPage");

  return buildPageMetadata({
    title: t("title"),
    description: t("seoDescription"),
    pathname: "/achievements",
    locale,
  });
};

const AchievementsFallback = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
    {[...Array(6)].map((_, index) => (
      <AchievementSkeleton key={index} />
    ))}
  </div>
);

const AchievementsPage = async () => {
  const t = await getTranslations("AchievementsPage");
  const nav = await getTranslations("Navigation");
  const initialAchievements = await getPublicAchievementsData();

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: nav("Home"), pathname: "/" },
    { name: t("title"), pathname: "/achievements" },
  ]);

  return (
    <Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbJsonLd),
        }}
      />
      <PageHeading title={t("title")} description={t("description")} />
      <Suspense fallback={<AchievementsFallback />}>
        <Achievements initialData={initialAchievements} />
      </Suspense>
    </Container>
  );
};

export default AchievementsPage;
