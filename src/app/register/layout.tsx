import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register — New Connection | VBC On Fiber",
  description: "Sign up for a new VBC On Fiber broadband or IPTV connection in Visakhapatnam.",
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
