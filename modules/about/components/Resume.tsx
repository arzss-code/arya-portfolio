import { useTranslations } from "next-intl";
import { LuDownload as DownloadIcon } from "react-icons/lu";

import { getButtonClasses } from "@/common/components/elements/Button";

const Resume = () => {
  const t = useTranslations("AboutPage");

  const RESUME_URL = "/CV_Atsiila_Arya_Nabiih.pdf";

  return (
    <a
      href={RESUME_URL}
      download
      className={getButtonClasses({
        variant: "secondary",
        size: "md",
        className: "w-fit",
      })}
      data-umami-event="click_resume_download_button"
    >
      <DownloadIcon size={17} aria-hidden="true" />
      <span>{t("resume_download_button")}</span>
    </a>
  );
};

export default Resume;
