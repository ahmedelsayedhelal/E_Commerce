import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  const locales = ["en", "ar"];
  const staticRoutes = [
    "",
    "/product",
    "/cart",
    "/wishlist",
    "/contact",
    "/about",
  ];

  const urls = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
    }))
  );

  return urls;
}
