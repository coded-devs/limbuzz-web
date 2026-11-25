import type { Metadata } from "next";
import { DocumentPage } from "@/components/document-page";
export const metadata: Metadata = {
  title: "Privacy draft",
  robots: { index: false, follow: true },
  alternates: { canonical: "/privacy" },
};
export default function Privacy() {
  return (
    <DocumentPage
      label="PENDING LEGAL REVIEW"
      title="Privacy, in plain language."
      intro="This is a draft description of the current V1 experience, not an approved privacy policy."
    >
      <h2>On your phone</h2>
      <p>
        LIMBUZZ V1 stores emergency contacts, session activity, action outcomes,
        and recording files locally. No account is required for the critical SOS
        path. Recovery uses the emergency information saved on your phone.
      </p>
      <h2>What leaves your phone</h2>
      <p>
        Emergency SMS, a location follow-up when available, and all-clear
        attempts are sent through your cellular carrier to your configured
        contacts. Calls go to your designated primary contact. Your carrier and
        the recipients handle that information outside LIMBUZZ. Opening a map
        link may involve a separate map provider.
      </p>
      <h2>Permissions and recordings</h2>
      <p>
        SMS and phone permissions support alerts and calls. Location permission
        enables location collection during emergencies. Microphone permission
        enables local recording. Notification access supports visible app
        alerts; contacts access can help choose a person from your phone.
        Emergency audio is not automatically uploaded or sent to contacts.
      </p>
      <h2>This website</h2>
      <p>
        This implementation includes no analytics, advertising scripts, account
        forms, or tracking cookies. Fonts and brand images are served locally.
        Hosting logs and any future services must be reviewed before public
        launch.
      </p>
      <h2>Before publication</h2>
      <p>
        The owner must approve the legal entity, privacy contact, retention and
        deletion arrangements, applicable rights, jurisdiction, hosting
        practices, and final policy text. No support email or legal address has
        been supplied.
      </p>
    </DocumentPage>
  );
}
