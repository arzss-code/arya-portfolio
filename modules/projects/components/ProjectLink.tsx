import Link from "next/link";
import { useTranslations } from "next-intl";
import { BsGithub as GithubIcon } from "react-icons/bs";
import { FiExternalLink as LinkIcon } from "react-icons/fi";

interface ProjectLinkProps {
  title?: string;
  link_github?: string;
  link_demo?: string;
}

interface LinkComponentProps {
  url: string;
  text: string;
  icon: JSX.Element;
}

const LinkComponent = ({ url, text, icon }: LinkComponentProps) => {
  return (
    <Link 
      href={url} 
      target="_blank"
      className="group flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors duration-300 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
    >
      <i className="transition-transform duration-300 group-hover:scale-110">{icon}</i>
      <span className="underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 group-hover:decoration-neutral-900 dark:decoration-neutral-700 dark:group-hover:decoration-neutral-100">
        {text}
      </span>
    </Link>
  );
};

const ProjectLink = ({ title, link_github, link_demo }: ProjectLinkProps) => {
  const t = useTranslations("ProjectsPage");

  return (
    <div className="flex flex-wrap items-center gap-4">
      {link_demo ? (
        <LinkComponent
          url={link_demo}
          text={t("live_demo_text")}
          icon={<LinkIcon size={18} />}
        />
      ) : null}
      {link_github ? (
        <LinkComponent
          url={link_github}
          text={t("source_code_text")}
          icon={<GithubIcon size={18} />}
        />
      ) : null}
    </div>
  );
};

export default ProjectLink;
