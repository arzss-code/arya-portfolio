"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { FiArrowLeft as BackIcon } from "react-icons/fi";

import { getButtonClasses } from "./Button";

interface BackButtonProps {
  url?: string;
}

const BackButton = ({ url }: BackButtonProps) => {
  const router = useRouter();
  const t = useTranslations("ProjectsPage");

  const buttonClassName = getButtonClasses({
    variant: "secondary",
    size: "sm",
    className: "group mb-6 px-3.5",
  });

  if (url) {
    return (
      <div className="w-fit">
        <Link href={url} className={buttonClassName}>
          <BackIcon
            size={15}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          <span>{t("back_button")}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-fit">
      <button
        type="button"
        onClick={() => router.back()}
        className={buttonClassName}
      >
        <BackIcon
          size={15}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:-translate-x-0.5"
        />
        <span>{t("back_button")}</span>
      </button>
    </div>
  );
};

export default BackButton;
