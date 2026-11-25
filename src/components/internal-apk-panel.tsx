import { getInternalApkInfo, internalApk } from "@/config/internal-apk";

export async function InternalApkPanel() {
  const artifact = await getInternalApkInfo();
  if (!artifact) return null;

  return (
    <section
      className="section internal-apk-section"
      aria-labelledby="internal-apk-title"
    >
      <div className="container internal-apk-panel">
        <div>
          <p className="eyebrow">LOCAL TEST BUILD</p>
          <h2 id="internal-apk-title">Internal APK for testing</h2>
          <p>
            This is a debug-signed build for local evaluation. It is not the
            verified public release and should not be relied on in an emergency.
          </p>
        </div>
        <div className="internal-apk-details">
          <p>
            LIMBUZZ {internalApk.version} (build {internalApk.versionCode}) ·{" "}
            {internalApk.minimumAndroid} · {internalApk.abi}
          </p>
          <p>
            {(artifact.bytes / 1_048_576).toFixed(1)} MB · SHA-256:{" "}
            <code>{artifact.sha256}</code>
          </p>
          <a
            className="button"
            href="/api/internal-build"
            download={internalApk.filename}
          >
            Download internal test APK
          </a>
          <small>
            Available only from this computer&apos;s development server.
          </small>
        </div>
      </div>
    </section>
  );
}
