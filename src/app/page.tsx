import type { Metadata } from "next";
import {
  Hero,
  Features,
  HowItWorks,
  AppShowcase,
  Trust,
  DownloadSection,
  FAQ,
} from "@/components/landing";
import { MotionEnhancements } from "@/components/motion-enhancements";
import { InsideLimbuzz } from "@/components/inside-limbuzz";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <MotionEnhancements />
      <Hero />
      <Features />
      <HowItWorks />
      <InsideLimbuzz />
      <AppShowcase />
      <Trust />
      <DownloadSection />
      <FAQ />
    </>
  );
}
