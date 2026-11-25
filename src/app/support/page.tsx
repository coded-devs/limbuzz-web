import type { Metadata } from "next";
import Link from "next/link";
import { DocumentPage } from "@/components/document-page";
export const metadata: Metadata = {
  title: "Support",
  alternates: { canonical: "/support" },
};
export default function Support() {
  return (
    <DocumentPage
      label="SUPPORT CHANNEL PENDING"
      title="Help with LIMBUZZ."
      intro="An official support contact has not been published yet."
    >
      <h2>Getting started</h2>
      <p>
        Read the <Link href="/#faq">frequently asked questions</Link> and{" "}
        <Link href="/download">Android installation guidance</Link>. The owner
        will add a verified support channel before public launch.
      </p>
      <h2>In an emergency</h2>
      <p>
        This website is not monitored for emergency requests. Contact local
        emergency services directly when needed.
      </p>
    </DocumentPage>
  );
}
