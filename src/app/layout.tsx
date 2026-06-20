import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import BottomTabBar from "@/components/layout/BottomTabBar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "VBC On Fiber - Vizag's Fastest Internet & TV Provider",
  description:
    "VBC (Vizag Broadcasting Company) - High-speed fiber broadband up to 1 Gbps, Digital TV, IPTV, and enterprise solutions in Visakhapatnam since 2012.",
  keywords: "VBC, Vizag fiber, broadband Visakhapatnam, IPTV, high-speed internet Vizag",
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BottomTabBar />
        <ScrollToTop />
      </body>
    </html>
  );
}
