import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { lstat } from "node:fs/promises";
import { resolve } from "node:path";

// This exact debug artifact is available only from the loopback development server.
// It is never copied into public/ or accepted by the public release gate.
export const internalApk = {
  filename: "LIMBUZZ-v1.0.1-debug-internal.apk",
  packageName: "com.limbuzz.app",
  version: "1.0.1",
  versionCode: 2,
  minimumAndroid: "Android 7.0+",
  abi: "arm64-v8a",
  bytes: 48_380_192,
  sha256: "817434b477dbde030aacd5a9af8ddce11668c8f16fc3dae2e73d6525c940d5e4",
  certificateSha256:
    "fac61745dc0903786fb9ede62a962b399f7348f0bb6f899b8332667591033b9c",
} as const;

export function canServeInternalApk(
  mode: string | undefined,
  url: string,
  host: string | null,
  fetchSite: string | null,
): boolean {
  if (mode !== "development") return false;
  try {
    if (!["127.0.0.1", "localhost"].includes(new URL(url).hostname))
      return false;
  } catch {
    return false;
  }
  return (
    /^127\.0\.0\.1:\d+$/.test(host ?? "") &&
    (fetchSite === null || fetchSite === "same-origin" || fetchSite === "none")
  );
}

export async function getInternalApkInfo(): Promise<{
  path: string;
  bytes: number;
  sha256: string;
} | null> {
  if (process.env.NODE_ENV !== "development") return null;
  const path = resolve(process.cwd(), "..", "LIMBUZZ-v1.0.1.apk");
  try {
    const file = await lstat(path);
    if (!file.isFile() || file.size !== internalApk.bytes) return null;
    const hash = createHash("sha256");
    for await (const chunk of createReadStream(path)) hash.update(chunk);
    const sha256 = hash.digest("hex");
    return sha256 === internalApk.sha256
      ? { path, bytes: file.size, sha256 }
      : null;
  } catch {
    return null;
  }
}
