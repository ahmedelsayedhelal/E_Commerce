import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "NEXT_PUBLIC_SITE_URL";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
