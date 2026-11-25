import Link from "next/link";
import { release, isPublicRelease } from "@/config/release";
import { Icon } from "./icon";
export function ReleaseAction() {
  return isPublicRelease(release) ? (
    <a className="button" href={release.publicUrl!}>
      <Icon name="download" />
      Download for Android
    </a>
  ) : (
    <button className="button unavailable" disabled>
      <Icon name="download" />
      Download for Android
    </button>
  );
}
export function ReleasePanel() {
  const available = isPublicRelease(release);
  return (
    <div className="release-panel">
      <div className="release-panel-heading">
        <span className="icon-box">
          <Icon name="smartphone" />
        </span>
        <span className="tag">
          {available ? "Public release" : "Coming soon"}
        </span>
      </div>
      <h2>
        {available ? `LIMBUZZ ${release.version}` : "LIMBUZZ for Android"}
      </h2>
      <p>
        {available
          ? "Review the release details before installing on your phone."
          : "The public download will open once the release-signed APK is verified."}
      </p>
      {available ? (
        <>
          <dl className="release-meta">
            {[
              ["Platform", "Android"],
              [
                "Version / build",
                `${release.version} / ${release.versionCode}`,
              ],
              [
                "Android / architecture",
                `${release.android} / ${release.abis.join(", ")}`,
              ],
              ["File size", `${(release.bytes! / 1048576).toFixed(1)} MB`],
              ["Published", release.publishedAt],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="checksum">
            <strong>SHA-256</strong>
            <code>{release.sha256}</code>
          </div>
        </>
      ) : (
        <p className="release-pending-details">
          Version, Android compatibility, file size, release date and checksum
          will be listed here with the APK.
        </p>
      )}
      <div className="release-action">
        <ReleaseAction />
      </div>
      <Link href="/releases" className="text-link">
        Release notes and availability
      </Link>
    </div>
  );
}
