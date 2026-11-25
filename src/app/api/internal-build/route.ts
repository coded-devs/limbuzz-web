import { createReadStream } from "node:fs";
import { Readable } from "node:stream";
import {
  canServeInternalApk,
  getInternalApkInfo,
  internalApk,
} from "@/config/internal-apk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const unavailable = () =>
    new Response("Not found", {
      status: 404,
      headers: { "Cache-Control": "no-store" },
    });

  if (
    !canServeInternalApk(
      process.env.NODE_ENV,
      request.url,
      request.headers.get("host"),
      request.headers.get("sec-fetch-site"),
    )
  )
    return unavailable();

  const artifact = await getInternalApkInfo();
  if (!artifact) return unavailable();

  const body = Readable.toWeb(
    createReadStream(artifact.path),
  ) as ReadableStream<Uint8Array>;
  return new Response(body, {
    headers: {
      "Content-Type": "application/vnd.android.package-archive",
      "Content-Disposition": `attachment; filename="${internalApk.filename}"`,
      "Content-Length": String(artifact.bytes),
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex, noarchive",
    },
  });
}
