import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — VBC On Fiber",
  description:
    "Get in touch with VBC On Fiber for sales enquiries, technical support, complaints, or feedback. We're here to help, 24/7.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
