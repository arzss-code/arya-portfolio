import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import { buildBreadcrumbJsonLd, serializeJsonLd } from "@/common/libs/jsonLd";
import { buildPageMetadata } from "@/common/libs/seo";
import Dashboard from "@/modules/dashboard/components/Dashboard";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const t = await getTranslations("DashboardPage");

  return buildPageMetadata({
    title: t("title"),
    description: t("seoDescription"),
    pathname: "/dashboard",
    locale,
  });
};

const DashboardPage = async () => {
  const t = await getTranslations("DashboardPage");
  const nav = await getTranslations("Navigation");

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: nav("Home"), pathname: "/" },
    { name: t("title"), pathname: "/dashboard" },
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
      <Dashboard />
    </Container>
  );
};

export default DashboardPage;
