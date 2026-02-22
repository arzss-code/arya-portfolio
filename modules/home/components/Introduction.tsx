import Image from "next/image";
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

  return (
    <section className="flex flex-col-reverse items-start justify-between gap-10 md:flex-row md:items-center">
      <div className="space-y-6 flex-1">
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
            Available for hire
          </span>
        </motion.div>

        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-5xl lg:text-5xl"
          >
            <h1>
              Hi, I&apos;m <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">{METADATA.creator}</span>
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
                "Cybersecurity Enthusiast",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
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
          
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/contact" passHref>
              <Button icon={<ContactIcon size={18} />} className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
                Contact Me
              </Button>
            </Link>
            <Link href="/resume" passHref>
              <Button icon={<DownloadIcon size={18} />} className="bg-neutral-100 hover:bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-50 border border-neutral-200 dark:border-neutral-700">
                Download CV
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="relative mx-auto flex items-center justify-center w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
      >
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
      </motion.div>
    </section>
  );
};

export default Introduction;
