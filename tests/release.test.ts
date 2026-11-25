import { test } from "node:test";
import assert from "node:assert/strict";
import { isPublicRelease, release, type Release } from "../src/config/release";
const verified: Release = {
  verified: true,
  signing: "release",
  publicUrl: "https://downloads.limbuzz.test/limbuzz.apk",
  version: "2.0.0",
  versionCode: 2,
  android: "Android 10+",
  abis: ["arm64-v8a"],
  bytes: 12000000,
  sha256: "a".repeat(64),
  publishedAt: "2026-11-22",
  notes: ["Owner-verified release"],
};
test("shipping config never exposes an APK", () => {
  assert.equal(isPublicRelease(release), false);
  assert.equal(release.publicUrl, null);
});
test("complete owner-verified release enables download", () => {
  assert.equal(isPublicRelease(verified), true);
});
test("debug signing and incomplete attestations fail closed", () => {
  for (const value of [
    { signing: "debug" },
    { signing: "unverified" },
    { verified: false },
    { sha256: null },
    { bytes: 0 },
    { bytes: 1.5 },
    { version: null },
    { versionCode: 0 },
    { android: null },
    { abis: [] },
    { publishedAt: "unknown" },
    { notes: [] },
  ])
    assert.equal(
      isPublicRelease({ ...verified, ...value } as Release),
      false,
      JSON.stringify(value),
    );
});
test("private, credentialed, temporary and insecure URLs fail closed", () => {
  for (const publicUrl of [
    "bad",
    "http://host.test/a.apk",
    "https://github.com/o/r/releases/download/v1/a.apk",
    "https://api.github.com/repos/o/r/releases/assets/1",
    "https://user:password@host.test/a.apk",
    "https://host.test/a.apk?token=secret",
    "https://localhost/a.apk",
    "https://192.168.0.1/a.apk",
    "https://example.com/a.apk",
    "https://host.test/a.zip",
    "https://host.test/a.apk#fragment",
  ])
    assert.equal(isPublicRelease({ ...verified, publicUrl }), false, publicUrl);
});
