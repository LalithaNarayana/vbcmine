import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pay Online — VBC On Fiber",
  description: "Pay your VBC On Fiber broadband or IPTV bill securely online in just a few clicks.",
};

export default function PayOnlineLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
