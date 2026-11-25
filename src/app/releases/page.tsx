import type { Metadata } from "next";
import Link from "next/link";
import { DocumentPage } from "@/components/document-page";
import { release, isPublicRelease } from "@/config/release";
export const metadata: Metadata = {
  title: "Release notes",
  alternates: { canonical: "/releases" },
};
export default function Releases() {
  const available = isPublicRelease(release);
  return (
    <DocumentPage
      label="ANDROID RELEASES"
      title="Release notes."
      intro={
        available
          ? `Version ${release.version} · ${release.publishedAt}`
          : "No verified public Android release is available yet."
      }
    >
      {available ? (
        <ul>
          {release.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      ) : (
        <>
          <h2>Preparing the first public download</h2>
          <p>
            Release notes, Android compatibility, architecture, file size, and a
            SHA-256 checksum will be published alongside the verified APK.
            Internal testing builds are not public downloads.
          </p>
        </>
      )}
      <Link href="/download" className="text-link">
        View Android download status
      </Link>
    </DocumentPage>
  );
}
