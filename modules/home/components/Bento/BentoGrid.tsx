"use client";

import { useTranslations } from "next-intl";
import { SiBento as BentoIcon } from "react-icons/si";

import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";
import { BENTO } from "@/common/constants/bento";

import BentoCard from "./BentoCard";

const BentoGrid = () => {
  const t = useTranslations("HomePage.bento");

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
