import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import { buildBreadcrumbJsonLd, serializeJsonLd } from "@/common/libs/jsonLd";
import { buildPageMetadata } from "@/common/libs/seo";
import Contact from "@/modules/contact";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const t = await getTranslations("ContactPage");

  return buildPageMetadata({
    title: t("title"),
    description: t("seoDescription"),
    pathname: "/contact",
    locale,
  });
};

const ContactPage = async () => {
  const t = await getTranslations("ContactPage");
  const nav = await getTranslations("Navigation");

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: nav("Home"), pathname: "/" },
    { name: t("title"), pathname: "/contact" },
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
      <Contact />
    </Container>
  );
};

export default ContactPage;
