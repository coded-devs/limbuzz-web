import { test } from "node:test";
import assert from "node:assert/strict";
import {
  canServeInternalApk,
  getInternalApkInfo,
  internalApk,
} from "../src/config/internal-apk";

test("internal debug download is never available in production", () => {
  assert.equal(
    canServeInternalApk(
      "production",
      "http://127.0.0.1:3000/api/internal-build",
      "127.0.0.1:3000",
      "same-origin",
    ),
    false,
  );
});

test("internal debug download requires the loopback development origin", () => {
  const url = "http://127.0.0.1:3000/api/internal-build";
  assert.equal(
    canServeInternalApk("development", url, "127.0.0.1:3000", "same-origin"),
    true,
  );
  assert.equal(
    canServeInternalApk(
      "development",
      "http://localhost:3000/api/internal-build",
      "127.0.0.1:3000",
      null,
    ),
    true,
  );
  assert.equal(
    canServeInternalApk("development", url, "example.com", "same-origin"),
    false,
  );
  assert.equal(
    canServeInternalApk(
      "development",
      "http://example.com/api/internal-build",
      "127.0.0.1:3000",
      "same-origin",
    ),
    false,
  );
  assert.equal(
    canServeInternalApk("development", url, "127.0.0.1:3000", "cross-site"),
    false,
  );
});

test("the local artifact remains separate from the public release", async () => {
  assert.equal(internalApk.filename.endsWith("debug-internal.apk"), true);
  if (process.env.NODE_ENV !== "development") {
    assert.equal(await getInternalApkInfo(), null);
  }
});
