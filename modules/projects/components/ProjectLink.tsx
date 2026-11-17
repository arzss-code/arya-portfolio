import Link from "next/link";
import { useTranslations } from "next-intl";
import { BsGithub as GithubIcon } from "react-icons/bs";
import { FiExternalLink as LinkIcon } from "react-icons/fi";

import {
  ButtonVariant,
  getButtonClasses,
} from "@/common/components/elements/Button";

interface ProjectLinkProps {
  title?: string;
  link_github?: string;
  link_demo?: string;
}

interface LinkComponentProps {
  url: string;
  text: string;
  ariaLabel?: string;
  variant: ButtonVariant;
  icon: React.ReactNode;
}

const LinkComponent = ({
  url,
  text,
  ariaLabel,
  variant,
  icon,
}: LinkComponentProps) => {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={getButtonClasses({ variant, size: "sm" })}
    >
      <span aria-hidden="true" className="shrink-0">
        {icon}
      </span>
      <span>{text}</span>
    </Link>
  );
};

const ProjectLink = ({ title, link_github, link_demo }: ProjectLinkProps) => {
  const t = useTranslations("ProjectsPage");

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {link_demo ? (
        <LinkComponent
          url={link_demo}
          text={t("live_demo_text")}
          ariaLabel={
            title ? `${t("live_demo_text")} — ${title}` : t("live_demo_text")
          }
          variant="primary"
          icon={<LinkIcon size={15} />}
        />
      ) : null}
      {link_github ? (
        <LinkComponent
          url={link_github}
          text={t("source_code_text")}
          ariaLabel={
            title
              ? `${t("source_code_text")} — ${title}`
              : t("source_code_text")
          }
          variant="secondary"
          icon={<GithubIcon size={15} />}
        />
      ) : null}
    </div>
  );
};

export default ProjectLink;
