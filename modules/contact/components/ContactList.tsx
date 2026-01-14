import { useTranslations } from "next-intl";

import { SOCIAL_MEDIA } from "@/common/constants/socialMedia";

import ContactCard from "./ContactCard";

const ContactList = () => {
  const filteredSocialMedia = SOCIAL_MEDIA?.filter((social) => social?.isShow);
  const t = useTranslations("ContactPage");

  return (
    <div className="flex h-full flex-col space-y-6">
      <h2 className="text-2xl font-bold">{t("social_media.title")}</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {filteredSocialMedia.map((media) => (
          <ContactCard key={media.title} {...media} />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
