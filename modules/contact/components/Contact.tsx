import Breakline from "@/common/components/elements/Breakline";

import ContactList from "./ContactList";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-stretch">
      <div className="flex-1 lg:max-w-[48%]">
        <ContactList />
      </div>
      <div className="flex-1 lg:max-w-[52%]">
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
