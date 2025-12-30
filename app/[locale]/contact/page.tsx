import { ContactForm } from "@/app/components/contact/ContactForm";
import { useTranslations } from "next-intl";
import {use} from "react";



export default function ContactPage({ params }: {params: Promise <{ locale: string }>}) {
  const { locale } = use (params);
  const t = useTranslations("contact")

  return (
    <section className="max-w-md mx-auto py-16">
      <h1 className="mb-6 text-3xl font-bold px-4">
        {t("contact")}
      </h1>

      <ContactForm locale={locale} />
    </section>
  );
}
