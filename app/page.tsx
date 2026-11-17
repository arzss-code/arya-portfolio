import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import Container from "@/common/components/elements/Container";
import { buildPageMetadata } from "@/common/libs/seo";
import Home from "@/modules/home";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const t = await getTranslations("HomePage");

  return buildPageMetadata({
    title: t("seoTitle"),
    description: t("seoDescription"),
    pathname: "/",
    locale,
    absoluteTitle: true,
  });
};

const HomePage = () => {
  return (
    <Container>
      <Home />
    </Container>
  );
};

export default HomePage;
