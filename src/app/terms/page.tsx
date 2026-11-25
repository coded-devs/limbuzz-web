import type { Metadata } from "next";
import { DocumentPage } from "@/components/document-page";
export const metadata: Metadata = {
  title: "Terms draft",
  robots: { index: false, follow: true },
  alternates: { canonical: "/terms" },
};
export default function Terms() {
  return (
    <DocumentPage
      label="PENDING LEGAL REVIEW"
      title="Terms of use — draft."
      intro="These notes describe product limitations. They are not an approved agreement or legal advice."
    >
      <h2>A communication tool</h2>
      <p>
        LIMBUZZ helps you contact people you select. It does not dispatch
        emergency services and cannot guarantee delivery, a response, rescue, or
        safety. Contact local emergency services directly when needed.
      </p>
      <h2>Device and network requirements</h2>
      <p>
        SMS and calls require functioning cellular service, suitable device
        support, and permissions. Carrier charges can apply. Location and
        recording depend on permissions and device availability. Keep your
        contacts and phone settings up to date.
      </p>
      <h2>Install from an approved source</h2>
      <p>
        A public APK will be offered only after release-signing and
        verification. Do not use internal testing builds as public releases or
        bypass Android security warnings.
      </p>
      <h2>Owner review required</h2>
      <p>
        Eligibility, permitted use, licensing, liability, governing law, dispute
        handling, legal entity, contact details, and the effective date remain
        for owner and legal review before launch.
      </p>
    </DocumentPage>
  );
}
