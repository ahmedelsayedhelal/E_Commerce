import { ContactForm } from "@/app/components/contact/ContactForm";
import { useTranslations } from "next-intl";




export default function ContactPage() {
  
  const t = useTranslations("contact")

  return (
    <section className="max-w-md mx-auto py-16">
      <h1 className="mb-6 text-3xl font-bold px-4">
        {t("contact")}
      </h1>

      <ContactForm  />
    </section>
  );
}
