import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { getButtonClasses } from "@/common/components/elements/Button";
import Container from "@/common/components/elements/Container";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  robots: {
    index: false,
    follow: true,
  },
};

const NotFound = async () => {
  const t = await getTranslations("NotFoundPage");

  return (
    <Container className="flex h-full flex-col items-center justify-center gap-y-5 py-12">
      <h1 className="text-6xl font-semibold tabular-nums text-neutral-700 dark:text-neutral-300">
        404
      </h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        {t("title")}
      </p>
      <Link
        href="/"
        className={getButtonClasses({
          variant: "obsidian",
          size: "md",
          shape: "pill",
          className: "px-6",
        })}
      >
        {t("button")}
      </Link>
    </Container>
  );
};

export default NotFound;
