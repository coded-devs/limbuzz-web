import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
export default function robots(): MetadataRoute.Robots {
  return siteUrl
    ? {
        rules: { userAgent: "*", allow: "/", disallow: ["/privacy", "/terms"] },
        sitemap: new URL("/sitemap.xml", siteUrl).href,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
