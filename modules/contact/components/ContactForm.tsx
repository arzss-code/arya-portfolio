"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiCheckCircle } from "react-icons/fi";

import InputField from "@/common/components/elements/InputField";

interface FormEmail {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormEmail>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const t = useTranslations("ContactPage");

  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    if (isSuccess) {
      const timeout = setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess]);

  const handleFormSubmit = async (payload: FormEmail) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/email", payload);
      if (response.status === 200) {
        setIsSuccess(true);
        reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col space-y-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          {t("form.title")}
        </h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {t("form.sub_title")}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4"
      >
        <div className="flex w-full flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <InputField
            name="name"
            placeholder={t("form.input_name")}
            rule={{ required: t("form.error_name") }}
            register={register}
            error={errors}
          />
          <InputField
            name="email"
            placeholder={t("form.input_email")}
            rule={{
              required: t("form.error_email_required"),
              pattern: {
                value: regexEmail,
                message: t("form.error_email_invalid"),
              },
            }}
            register={register}
            error={errors}
          />
        </div>
        <InputField
          name="message"
          placeholder={t("form.input_message")}
          rows={5}
          rule={{ required: t("form.error_message") }}
          register={register}
          error={errors}
          isTextArea
        />
        
        <button
          disabled={isLoading || isSuccess}
          type="submit"
          className={`relative w-full overflow-hidden rounded-xl px-6 py-4 font-bold transition-all duration-300 ${
            isSuccess 
              ? "bg-emerald-500 text-white shadow-emerald-500/30" 
              : "bg-blue-600 text-white shadow-sm hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30"
            } 
            disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none`}
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-center gap-2"
              >
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                <span>{t("form.sending")}</span>
              </motion.div>
            ) : isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="flex items-center justify-center gap-2"
              >
                <FiCheckCircle size={20} />
                <span>{t("form.success")}</span>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center justify-center gap-2"
              >
                <FiSend size={18} />
                <span>{t("form.button")}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
