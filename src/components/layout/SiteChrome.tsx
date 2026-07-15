"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomTabBar from "@/components/layout/BottomTabBar";

interface SiteChromeProps {
  children: React.ReactNode;
  siteName?: string;
  logo?: string;
  contact1?: string;
  contact2?: string;
  mail1?: string;
  mail2?: string;
  address?: string;
  topBarTitle?: string;
  topBarNumber?: string;
  footerDescription?: string;
  businessServices?: { name: string; slug: string; icon: string }[];
}

/**
 * Renders the public site chrome (Navbar, Footer, BottomTabBar) around
 * page content — except on /admin/** routes, which run their own
 * AdminSidebar / AdminTopbar layout instead. Kept as a client component
 * so it can read the current pathname; the async data-fetching for
 * settings still happens once in the server-rendered RootLayout.
 */
export default function SiteChrome({
  children,
  siteName,
  logo,
  contact1,
  contact2,
  mail1,
  mail2,
  address,
  topBarTitle,
  topBarNumber,
  footerDescription,
  businessServices,
}: SiteChromeProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar
        siteName={siteName}
        logo={logo}
        contact1={contact1}
        topBarTitle={topBarTitle}
        topBarNumber={topBarNumber}
      />
      <main>{children}</main>
      <Footer
        siteName={siteName}
        logo={logo}
        contact1={contact1}
        contact2={contact2}
        mail1={mail1}
        mail2={mail2}
        address={address}
        description={footerDescription}
        businessServices={businessServices}
      />
      <BottomTabBar />
    </>
  );
}
