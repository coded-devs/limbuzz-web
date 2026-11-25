const origin = process.env.SITE_URL;
export const siteUrl = origin ? new URL(origin) : null;
if (
  siteUrl &&
  (siteUrl.protocol !== "https:" ||
    siteUrl.username ||
    siteUrl.password ||
    siteUrl.pathname !== "/" ||
    siteUrl.search ||
    siteUrl.hash)
)
  throw new Error("SITE_URL must be an approved HTTPS origin");
export const description =
  "LIMBUZZ helps you alert trusted contacts with device SMS, a primary-contact call, and location when available. Android-first, with a local-first SOS path.";
