import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteUrl;
  return origin
    ? ["/", "/download", "/releases", "/support"].map((path) => ({
        url: new URL(path, origin).href,
      }))
    : [];
}
