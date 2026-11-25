export type Release = {
  verified: boolean;
  signing: "unverified" | "release" | "debug";
  publicUrl: string | null;
  version: string | null;
  versionCode: number | null;
  android: string | null;
  abis: readonly string[];
  bytes: number | null;
  sha256: string | null;
  publishedAt: string | null;
  notes: readonly string[];
};

// Owner verification is required: this flag is an attestation, not signature inspection.
export const release: Release = {
  verified: false,
  signing: "unverified",
  publicUrl: null,
  version: null,
  versionCode: null,
  android: null,
  abis: [],
  bytes: null,
  sha256: null,
  publishedAt: null,
  notes: [],
};

export function isPublicRelease(candidate: Release): boolean {
  if (
    !candidate.verified ||
    candidate.signing !== "release" ||
    !candidate.publicUrl
  )
    return false;
  try {
    const url = new URL(candidate.publicUrl);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.search ||
      url.hash
    )
      return false;
    if (
      url.hostname === "localhost" ||
      url.hostname.endsWith(".local") ||
      url.hostname.endsWith(".invalid") ||
      url.hostname === "example.com" ||
      url.hostname.endsWith(".example.com")
    )
      return false;
    if (
      /^(\d{1,3}\.){3}\d{1,3}$/.test(url.hostname) ||
      url.hostname.includes(":")
    )
      return false;
    if (
      [
        "github.com",
        "api.github.com",
        "objects.githubusercontent.com",
      ].includes(url.hostname)
    )
      return false;
    if (!url.pathname.endsWith(".apk")) return false;
  } catch {
    return false;
  }
  return Boolean(
    candidate.version?.trim() &&
    Number.isSafeInteger(candidate.versionCode) &&
    candidate.versionCode! > 0 &&
    candidate.android?.trim() &&
    candidate.abis.length &&
    candidate.abis.every((a) => a.trim()) &&
    Number.isSafeInteger(candidate.bytes) &&
    candidate.bytes! > 0 &&
    /^[a-f\d]{64}$/i.test(candidate.sha256 ?? "") &&
    /^\d{4}-\d{2}-\d{2}$/.test(candidate.publishedAt ?? "") &&
    Number.isFinite(Date.parse(candidate.publishedAt ?? "")) &&
    candidate.notes.length &&
    candidate.notes.every((n) => n.trim()),
  );
}
