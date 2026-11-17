"use client";

import { useTranslations } from "next-intl";
import { TypeAnimation } from "react-type-animation";
import { motion, useReducedMotion } from "framer-motion";
import { METADATA } from "@/common/constants/metadata";
import { FiDownload as DownloadIcon } from "react-icons/fi";
import { BiEnvelope as ContactIcon } from "react-icons/bi";
import { getButtonClasses } from "@/common/components/elements/Button";
import Link from "next/link";
import TiltedCard from "@/common/components/elements/TiltedCard";

const Introduction = () => {
  const t = useTranslations("HomePage");
  const shouldReduceMotion = useReducedMotion();

  const stats = [
    { value: "7+", label: t("stats.projects") },
    { value: "3+", label: t("stats.awards") },
    { value: "2+", label: t("stats.experience") },
  ];

  return (
    <section className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-center">
      {/* ── Left: Text content ── */}
      <div className="flex-1 space-y-8">
        {/* Availability badge — tactile surface pill */}
        <div className="surface-tactile-pill inline-flex items-center gap-2 rounded-full px-3.5 py-1.5">
          <div className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
          </div>
          <span className="text-xs font-semibold tracking-wide text-neutral-700 dark:text-neutral-200">
            {t("available")}
          </span>
        </div>

        {/* Name + type animation */}
        <div className="space-y-3">
          <div className="text-balance text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-5xl lg:text-5xl">
            <h1>
              {t.rich("intro", {
                name: (chunks) => (
                  <span
                    translate="no"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-500"
                  >
                    {chunks}
                  </span>
                ),
              })}
            </h1>
          </div>

          <div className="min-h-[2rem] text-xl font-semibold text-neutral-600 dark:text-neutral-400 md:text-2xl">
            {shouldReduceMotion ? (
              <span>Frontend Developer &amp; UI/UX Designer</span>
            ) : (
              <TypeAnimation
                sequence={[
                  "Frontend Developer",
                  2000,
                  "UI/UX Designer",
                  2000,
                  "AI/ML Enthusiast",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            )}
          </div>
        </div>

        {/* Location + bio */}
        <div className="space-y-4">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
            <li className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-blue-500"
              />
              {t("location")}
            </li>
            <li className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-blue-500"
              />
              {t("location_type")}
            </li>
          </ul>
          <p className="max-w-xl leading-relaxed text-neutral-700 dark:text-neutral-300">
            {t("resume")}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3.5">
          <Link
            href="/contact"
            className={getButtonClasses({ variant: "primary", size: "md" })}
          >
            <ContactIcon size={18} aria-hidden="true" />
            <span>{t("contact_btn")}</span>
          </Link>
          <a
            href="/CV_Atsiila_Arya_Nabiih.pdf"
            download
            className={getButtonClasses({ variant: "secondary", size: "md" })}
          >
            <DownloadIcon size={17} aria-hidden="true" />
            <span>{t("download_btn")}</span>
          </a>
        </div>
      </div>

      {/* ── Right: Profile photo + stats ── */}
      <div className="mx-auto flex flex-col items-center gap-6">
        {/* Profile card */}
        <div className="relative flex h-64 w-64 items-center justify-center md:h-80 md:w-80 lg:h-96 lg:w-96">
          <TiltedCard
            imageSrc={METADATA.profile}
            altText={`${METADATA.creator} — ${METADATA.role}`}
            captionText={METADATA.creator}
            containerHeight="100%"
            containerWidth="100%"
            imageHeight="100%"
            imageWidth="100%"
            intrinsicWidth={384}
            intrinsicHeight={384}
            priority={true}
            rotateAmplitude={12}
            scaleOnHover={1.05}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
          />
        </div>

        {/* Stats row */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex w-full items-center justify-center divide-x divide-neutral-200 pt-4 dark:divide-neutral-800"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-1 flex-col items-center justify-center space-y-1 px-4 text-center"
            >
              <span className="text-xl font-bold tabular-nums tracking-tight text-neutral-900 dark:text-neutral-50">
                {stat.value}
              </span>
              <span className="text-[10px] font-medium uppercase text-neutral-500 dark:text-neutral-400">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Introduction;
