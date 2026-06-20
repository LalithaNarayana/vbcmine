import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login — VBC On Fiber My Account",
  description: "Log in to your VBC On Fiber account to manage your plan, payments, and support requests.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
