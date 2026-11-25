import type { Metadata } from "next";
import { InstallGuide } from "@/components/landing";
import { ReleasePanel } from "@/components/release-panel";
import { InternalApkPanel } from "@/components/internal-apk-panel";
export const metadata: Metadata = {
  title: "Android download",
  description:
    "Public Android release status, verified APK details, and installation guidance for LIMBUZZ.",
  alternates: { canonical: "/download" },
};
export default function Download() {
  return (
    <>
      <div className="container page-intro">
        <p className="eyebrow">LIMBUZZ FOR ANDROID</p>
        <h1>
          A prepared phone.
          <br />A simpler first step.
        </h1>
        <p className="lead">
          Check public release availability and learn how to install LIMBUZZ.
        </p>
      </div>
      <section className="section">
        <div className="container download-grid">
          <ReleasePanel />
          <InstallGuide />
        </div>
      </section>
      <InternalApkPanel />
    </>
  );
}
