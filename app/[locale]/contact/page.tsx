import { ContactForm } from "@/app/components/contact/ContactForm";
import { useTranslations } from "next-intl";




export default function ContactPage() {
  
  const t = useTranslations("contact")

  return (
    <section className="w-full px-4 py-16 md:mx-auto md:max-w-md">
      <h1 className="mb-6 text-3xl font-bold ">
        {t("contact")}
      </h1>

      <ContactForm  />
    </section>
  );
}
