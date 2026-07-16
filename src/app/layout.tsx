import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";
import ScrollToTop from "@/components/ui/ScrollToTop";
import PlanRequestProvider from "@/components/plans/PlanRequestProvider";
import UserSessionProvider from "@/components/auth/UserSessionProvider";
import connectDB from "@/lib/mongodb";
import { getOrCreateSettings } from "@/models/Settings";
import BusinessService from "@/models/BusinessService";

export async function generateMetadata(): Promise<Metadata> {
  await connectDB();
  const settings = await getOrCreateSettings();

  return {
    title:
      settings.metaTitle ||
      "VBC On Fiber - Vizag's Fastest Internet & TV Provider",
    description:
      settings.metaDescription ||
      "VBC (Vizag Broadcasting Company) - High-speed fiber broadband up to 1 Gbps, Digital TV, IPTV, and enterprise solutions in Visakhapatnam since 2012.",
    icons: settings.favicon
      ? {
          icon: settings.favicon,
          shortcut: settings.favicon,
          apple: settings.favicon,
        }
      : {
          icon: "/images/favicon.png",
          shortcut: "/images/favicon.png",
          apple: "/images/favicon.png",
        },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connectDB();
  const settings = await getOrCreateSettings();
  const businessServices = await BusinessService.find()
    .sort({ order: 1, createdAt: 1 })
    .lean();

  const services = JSON.parse(JSON.stringify(businessServices)) as {
    name: string;
    slug: string;
    icon: string;
  }[];

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <UserSessionProvider>
          <PlanRequestProvider>
            <SiteChrome
              siteName={settings.siteName}
              logo={settings.logo}
              contact1={settings.contact1}
              contact2={settings.contact2}
              mail1={settings.mail1}
              mail2={settings.mail2}
              address={settings.address}
              topBarTitle={settings.topBarTitle}
              topBarNumber={settings.topBarNumber}
              footerDescription={settings.footerDescription}
              businessServices={services}
            >
              {children}
            </SiteChrome>
          </PlanRequestProvider>
        </UserSessionProvider>
        <ScrollToTop />
      </body>
    </html>
  );
}