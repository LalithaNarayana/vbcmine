import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renew Your Plan — VBC On Fiber",
  description: "Renew your VBC On Fiber broadband or IPTV plan quickly and securely online.",
};

export default function RenewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
