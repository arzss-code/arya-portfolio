"use client";

import { useTranslations } from "next-intl";
import { SiBento as BentoIcon } from "react-icons/si";
import {
  BiUser as AboutIcon,
  BiCollection as ProjectIcon,
  BiCategory as DashboardIcon,
  BiBook as ContactIcon,
} from "react-icons/bi";
import { PiCertificate as AchievementIcon } from "react-icons/pi";

import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";

import MarqueeIcons from "./MarqueeIcons";
import AchievementFolder from "./AchievementFolder";
import ProjectsCarousel from "./ProjectsCarousel";
import StackImagesPersonal from "./StackImagesPersonal";
import TrueFocusService from "./TrueFocusService";
import BentoCard from "./BentoCard";

const size = 22;

const BentoGrid = () => {
  const t = useTranslations("HomePage.bento");

  const BENTO = [
    {
      title: t("about.title"),
      description: t("about.description"),
      label: "About",
      icon: <AboutIcon size={size} />,
      visual: <StackImagesPersonal />,
      href: "/about",
      colSpan: 1 as const,
      isShow: true,
    },
    {
      title: t("projects.title"),
      description: t("projects.description"),
      label: "Projects",
      icon: <ProjectIcon size={size} />,
      visual: <ProjectsCarousel />,
      href: "/projects",
      colSpan: 2 as const,
      isShow: true,
    },
    {
      title: t("skills.title"),
      description: t("skills.description"),
      label: "Skills",
      icon: <DashboardIcon size={size} />,
      visual: <MarqueeIcons />,
      href: "/",
      colSpan: 1 as const,
      isShow: true,
    },
    {
      title: t("achievements.title"),
      description: t("achievements.description"),
      label: "Achievements",
      icon: <AchievementIcon size={size} />,
      visual: <AchievementFolder />,
      href: "/achievements",
      colSpan: 2 as const,
      isShow: true,
    },
    {
      title: t("services.title"),
      description: t("services.description"),
      label: "Services",
      icon: <ContactIcon size={size} />,
      visual: <TrueFocusService />,
      href: "/",
      colSpan: 2 as const,
      isShow: true,
    },
  ];

  const filteredBento = BENTO.filter((item) => item?.isShow);

  return (
    <section className="space-y-6 sm:space-y-10">
      <div className="space-y-3">
        <SectionHeading title={t("title")} icon={<BentoIcon size={24} />} />
        <SectionSubHeading>{t("sub_title")}</SectionSubHeading>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:gap-8">
        {filteredBento.map((item, index) => (
          <BentoCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default BentoGrid;
