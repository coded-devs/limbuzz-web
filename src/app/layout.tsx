import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteUrl, description } from "@/config/site";
import "./globals.css";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: siteUrl ?? new URL("http://localhost:3000"),
  title: {
    default: "LIMBUZZ — Getting help shouldn’t be complicated",
    template: "%s | LIMBUZZ",
  },
  description,
  robots: siteUrl
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    title: "LIMBUZZ — Getting help shouldn’t be complicated",
    description,
    type: "website",
    locale: "en_NG",
    siteName: "LIMBUZZ",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "LIMBUZZ. Critical information. People you trust.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LIMBUZZ",
    description,
    images: ["/opengraph-image.png"],
  },
  icons: { icon: "/brand/favicon.png", apple: "/brand/icon.png" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
