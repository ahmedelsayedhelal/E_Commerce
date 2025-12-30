
import { useTranslations } from "next-intl";

export default function AboutPage() {
 
  const t = useTranslations("About");

  return (
    <section className="max-w-3xl mx-auto py-16 space-y-6 px-4">
      <h1 className="text-3xl font-bold">
       {t("Aboutus")}
      </h1>

      <p className="text-muted-foreground leading-relaxed">
       {t("firstdescription")}
      </p>

      <p className="text-muted-foreground leading-relaxed">
       {t("seconddescription")}
      </p>

      <p className="text-muted-foreground leading-relaxed">
       {t("thirddescription")}
      </p>

     
    </section>
  );
}
