import { use } from "react";

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  return (
    <section className="max-w-3xl mx-auto py-16 space-y-6 px-4">
      <h1 className="text-3xl font-bold">
        {locale === "ar" ? "من نحن" : "About Us"}
      </h1>

      <p className="text-muted-foreground leading-relaxed">
        {locale === "ar"
          ? "هذا متجر إلكتروني تجريبي مبني باستخدام Next.js ويهدف إلى عرض مهارات تطوير الواجهات والخلفيات الحديثة."
          : "This is a demo e-commerce project built with Next.js to showcase modern frontend and backend development skills."}
      </p>

      <p className="text-muted-foreground leading-relaxed">
        {locale === "ar"
          ? "يركز المشروع على أفضل الممارسات في بناء التطبيقات، مثل تنظيم الكود، دعم تعدد اللغات، وتحسين تجربة المستخدم."
          : "The project focuses on best practices such as clean architecture, multi-language support, and an optimized user experience."}
      </p>

      <p className="text-muted-foreground leading-relaxed">
        {locale === "ar"
          ? "تم تصميم هذا المشروع ليحاكي متجرًا حقيقيًا من حيث تدفق المستخدم، إدارة السلة والمفضلة، ونماذج الإدخال والتحقق من البيانات."
          : "It is designed to simulate a real e-commerce experience, including cart and wishlist management, form validation, and user flows."}
      </p>

      <p className="text-muted-foreground leading-relaxed">
        {locale === "ar"
          ? "يُعد هذا المشروع جزءًا من مهمة تقنية ويعكس القدرة على بناء تطبيقات قابلة للتوسع باستخدام أحدث التقنيات."
          : "This project is part of a technical assignment and demonstrates the ability to build scalable applications using modern technologies."}
      </p>
    </section>
  );
}
