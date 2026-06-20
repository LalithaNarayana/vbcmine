import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — VBC On Fiber",
  description: "Answers to common questions about VBC On Fiber's broadband, IPTV, speeds, billing, and support.",
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
