"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { format, parseISO } from "date-fns";
import { HiX as CloseIcon } from "react-icons/hi";
import { HiOutlineArrowTopRightOnSquare as ExternalIcon } from "react-icons/hi2";

import Image from "@/common/components/elements/Image";
import { AchievementItem } from "@/common/types/achievements";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  achievement: AchievementItem | null;
}

const formatDate = (date?: string) => {
  if (!date) return null;
  try {
    return format(parseISO(date), "MMMM yyyy");
  } catch {
    return null;
  }
};

const AchievementDetailModal = ({ isOpen, onClose, achievement }: Props) => {
  const [mounted, setMounted] = useState(false);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!mounted || !achievement) return null;

  const issueDate = formatDate(achievement.issue_date);
  const expirationDate = formatDate(achievement.expiration_date);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-[0_25px_80px_-20px_rgba(0,0,0,0.6)] dark:border-neutral-800 dark:bg-neutral-900 md:flex-row"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-20 rounded-full bg-black/55 p-1.5 text-white transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              aria-label="Close"
            >
              <CloseIcon size={18} />
            </button>

            {/* Left: Certificate image — A4 Landscape ratio 297:210 */}
            <div className="flex-1 min-h-0 w-full overflow-y-auto bg-neutral-100 p-2 md:w-2/3 md:flex-none md:p-2">
              <Image
                src={achievement.image}
                alt={achievement.name}
                width={900}
                height={637}
                className="block w-full rounded-lg object-contain md:rounded-none"
              />
            </div>

            {/* Right: Details */}
            <div className="flex w-full shrink-0 flex-col justify-between gap-4 p-4 sm:p-6 md:w-1/3 md:flex-1 md:overflow-y-auto">
              <div className="space-y-4">
                <h3
                  id={titleId}
                  className="text-xl font-bold leading-tight text-neutral-900 dark:text-neutral-100 sm:text-xl"
                >
                  {achievement.name}
                </h3>

                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 sm:text-base">
                  {achievement.issuing_organization}
                </p>

                <div id={descId} className="space-y-3 text-sm">
                  {achievement.credential_id && (
                    <div className="space-y-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                        Credential ID
                      </p>
                      <p className="break-all text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        {achievement.credential_id}
                      </p>
                    </div>
                  )}

                  {issueDate && (
                    <div className="space-y-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                        Issue Date
                      </p>
                      <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        {issueDate}
                      </p>
                    </div>
                  )}

                  {expirationDate && (
                    <div className="space-y-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                        Expiration Date
                      </p>
                      <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        {expirationDate}
                      </p>
                    </div>
                  )}

                  {achievement.category && (
                    <div className="space-y-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                        Category
                      </p>
                      <span className="inline-flex w-fit items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        {achievement.category}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {achievement.url_credential && (
                <a
                  href={achievement.url_credential}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 md:w-auto"
                >
                  Credential URL
                  <ExternalIcon size={15} />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default AchievementDetailModal;
