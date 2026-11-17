"use client";

import axios from "axios";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

import Button from "@/common/components/elements/Button";
import InputField from "@/common/components/elements/InputField";

interface FormEmail {
  name: string;
  email: string;
  message: string;
}

const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormEmail>({
    shouldFocusError: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formHeadingId = useId();

  const t = useTranslations("ContactPage");

  useEffect(() => {
    if (!isSuccess) return;
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [isSuccess]);

  const handleFormSubmit = async (payload: FormEmail) => {
    setIsLoading(true);
    setSubmitError(null);
    try {
      const response = await axios.post("/api/email", payload);
      if (response.status === 200) {
        setIsSuccess(true);
        reset();
      }
    } catch {
      setSubmitError(
        "Failed to send message. Please check your connection or reach out directly via email.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="flex flex-col space-y-6 rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm md:p-8 dark:border-neutral-800 dark:bg-neutral-900/90"
    >
      <div className="space-y-1.5">
        <h2
          id={formHeadingId}
          className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100"
        >
          {t("form.title")}
        </h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {t("form.sub_title")}
        </p>
      </div>

      <form
        aria-labelledby={formHeadingId}
        noValidate
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-5"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <InputField
            name="name"
            label={t("form.input_name")}
            placeholder={t("form.input_name")}
            autoComplete="name"
            rule={{ required: t("form.error_name") }}
            register={register}
            error={errors}
          />
          <InputField
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            label={t("form.input_email")}
            placeholder="name@example.com"
            rule={{
              required: t("form.error_email_required"),
              pattern: {
                value: EMAIL_PATTERN,
                message: t("form.error_email_invalid"),
              },
            }}
            register={register}
            error={errors}
          />
        </div>

        <InputField
          name="message"
          label={t("form.input_message")}
          placeholder={t("form.input_message")}
          rows={5}
          rule={{ required: t("form.error_message") }}
          register={register}
          error={errors}
          isTextArea
        />

        {submitError ? (
          <div
            role="alert"
            aria-live="polite"
            className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
          >
            <FiAlertCircle size={18} aria-hidden="true" className="shrink-0" />
            <span>{submitError}</span>
          </div>
        ) : null}

        <div aria-live="polite" className="sr-only">
          {isSuccess ? t("form.success") : ""}
        </div>

        <Button
          disabled={isLoading || isSuccess}
          type="submit"
          variant={isSuccess ? "success" : "primary"}
          size="lg"
          className="h-12 w-full overflow-hidden font-semibold"
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center justify-center gap-2"
              >
                <div
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                />
                <span>{t("form.sending")}</span>
              </motion.div>
            ) : isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center justify-center gap-2"
              >
                <FiCheckCircle size={19} aria-hidden="true" />
                <span>{t("form.success")}</span>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="flex items-center justify-center gap-2"
              >
                <FiSend size={17} aria-hidden="true" />
                <span>{t("form.button")}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
