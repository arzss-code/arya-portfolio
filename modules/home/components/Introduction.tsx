"use client";

import { useTranslations } from "next-intl";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { METADATA } from "@/common/constants/metadata";
import { FiDownload as DownloadIcon } from "react-icons/fi";
import { BiEnvelope as ContactIcon } from "react-icons/bi";
import Button from "@/common/components/elements/Button";
import Link from "next/link";
import TiltedCard from "@/common/components/elements/TiltedCard";

const Introduction = () => {
  const t = useTranslations("HomePage");

  const stats = [
    { value: "7+", label: t("stats.projects") },
    { value: "3+", label: t("stats.awards") },
    { value: "2+", label: t("stats.experience") },
  ];

  return (
    <section className="flex flex-col-reverse items-start justify-between gap-12 md:flex-row md:items-center">
      {/* ── Left: Text content ── */}
      <div className="flex-1 space-y-8">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1.5"
        >
          <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </div>
          <span className="text-xs font-semibold tracking-wide text-green-600 dark:text-green-400">
            {t("available")}
          </span>
        </motion.div>

        {/* Name + type animation */}
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-5xl lg:text-5xl"
          >
            <h1>
              {t.rich("intro", {
                name: (chunks) => (
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    {chunks}
                  </span>
                ),
              })}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl font-semibold text-neutral-600 dark:text-neutral-400 md:text-2xl"
          >
            <TypeAnimation
              sequence={[
                "UI/UX Designer",
                2000,
                "Frontend Developer",
                2000,
                "AI/ML Enthusiast",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>
        </div>

        {/* Location + bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
              {t("location")}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
              {t("location_type")}
            </li>
          </ul>
          <p className="max-w-xl leading-relaxed text-neutral-700 dark:text-neutral-300">
            {t("resume")}
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Link href="/contact" passHref>
            <Button
              icon={<ContactIcon size={18} />}
              className="bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {t("contact_btn")}
            </Button>
          </Link>
          <a
            href="
            /CV_Atsiila_Arya_Nabiih.pdf"
            download
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-100 px-4 py-2 text-neutral-900 transition-all duration-300 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700"
          >
            <DownloadIcon size={18} />
            {t("download_btn")}
          </a>
        </motion.div>
      </div>

      {/* ── Right: Profile photo + stats ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="mx-auto flex flex-col items-center gap-6"
      >
        {/* Profile card */}
        <div className="relative flex h-64 w-64 items-center justify-center md:h-80 md:w-80 lg:h-96 lg:w-96">
          <TiltedCard
            imageSrc={METADATA.profile}
            altText={METADATA.creator}
            captionText={METADATA.creator}
            containerHeight="100%"
            containerWidth="100%"
            imageHeight="100%"
            imageWidth="100%"
            rotateAmplitude={12}
            scaleOnHover={1.05}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
          />
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="grid w-full grid-cols-3 gap-3"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.08 }}
              className="flex flex-col items-center rounded-2xl border border-neutral-200/60 bg-white/50 px-3 py-2.5 text-center shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
            >
              <span className="text-lg font-extrabold leading-none text-neutral-900 dark:text-white">
                {stat.value}
              </span>
              <span className="mt-0.5 text-[10px] font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Introduction;
