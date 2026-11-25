export const features = [
  {
    icon: "timer",
    title: "One deliberate action.",
    text: "Hold SOS for 3 seconds. Release sooner to stop activation without sending an alert.",
  },
  {
    icon: "message",
    title: "Reach your emergency contacts.",
    text: "Attempts an emergency SMS to each contact you’ve chosen.",
  },
  {
    icon: "location",
    title: "Location, when available.",
    text: "Adds a separate location SMS when a usable current fix is available. The initial alert never waits for GPS.",
  },
  {
    icon: "phone",
    title: "A call to someone you trust.",
    text: "Starts a call to your chosen primary contact.",
  },
  {
    icon: "audio",
    title: "Audio stays on your phone.",
    text: "Records emergency audio on your phone when microphone access is allowed.",
  },
  {
    icon: "history",
    title: "Clarity beyond the moment.",
    text: "Review past sessions and recover an open one after restart. End a session to attempt an all-clear to contacts already alerted.",
  },
] as const;
export const steps = [
  {
    title: "Choose your people",
    text: "Add trusted emergency contacts and choose the primary person LIMBUZZ should call.",
  },
  {
    title: "Prepare your phone",
    text: "Review SMS and phone access, then optional location and microphone access. Check notification visibility too.",
  },
  {
    title: "Hold SOS for 3 seconds",
    text: "Press and hold SOS until the three seconds are complete.",
  },
];
export const faqs = [
  [
    "Do I need an internet connection?",
    "You don’t need internet to start SOS, send SMS or place calls. Cellular service is still required. Recipients need connectivity to open a map link.",
  ],
  [
    "Will I be charged for SMS or calls?",
    "Your carrier’s SMS and call charges apply. Alerts, location updates, retries, and all-clear messages can incur charges; multipart messages may count as several SMS. Check your plan and available balance.",
  ],
  [
    "What if my location is unavailable?",
    "The initial emergency SMS goes ahead without waiting for GPS. With permission and a usable current fix, LIMBUZZ attempts a separate location message. Positioning and delivery are not guaranteed.",
  ],
  [
    "Why does LIMBUZZ ask for microphone access?",
    "Microphone access enables local emergency audio recording. If permission is unavailable, recording cannot start, but SMS and calling can still proceed. Audio is not automatically uploaded or sent to contacts.",
  ],
  [
    "Where is my information stored?",
    "Emergency contacts, session history and recordings are stored on your phone. SMS and calls travel through your carrier. You don’t need an account to use SOS.",
  ],
  [
    "How will I install the Android APK?",
    "When the public release is available, follow this site’s installation guide. Verify the published SHA-256 checksum, keep Android security checks enabled, and turn off the temporary installation permission afterward. Never bypass a security warning.",
  ],
  [
    "Does LIMBUZZ replace emergency services?",
    "No. LIMBUZZ is a communication tool for contacting people you trust. It does not dispatch emergency services or guarantee notification, response, rescue, or safety. Contact local emergency services directly when needed.",
  ],
] as const;
