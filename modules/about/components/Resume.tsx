import { useTranslations } from "next-intl";
import { LuDownload as DownloadIcon } from "react-icons/lu";

const Resume = () => {
  const t = useTranslations("AboutPage");

  const RESUME_URL = "/CV_Atsiila_Arya_Nabiih.pdf";

  return (
    <a
      href={RESUME_URL}
      download
      className="inline-flex w-fit items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-100 px-4 py-2 text-neutral-900 transition-colors duration-300 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700"
      data-umami-event="click_resume_download_button"
    >
      <DownloadIcon size={18} />
      <span>{t("resume_download_button")}</span>
    </a>
  );
};

export default Resume;
