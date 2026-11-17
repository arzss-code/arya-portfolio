import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import { buildBreadcrumbJsonLd, serializeJsonLd } from "@/common/libs/jsonLd";
import { buildPageMetadata } from "@/common/libs/seo";
import About from "@/modules/about";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const t = await getTranslations("AboutPage");

  return buildPageMetadata({
    title: t("title"),
    description: t("seoDescription"),
    pathname: "/about",
    locale,
  });
};

const AboutPage = async () => {
  const locale = await getLocale();
  const t = await getTranslations("AboutPage");
  const nav = await getTranslations("Navigation");

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: nav("Home"), pathname: "/" },
    { name: t("title"), pathname: "/about" },
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
      <About />
    </Container>
  );
};

export default AboutPage;
