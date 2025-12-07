import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { NavigationBar } from "@/components/navigation";
import { SiteFooter } from "@/components/footer";
import "./globals.css";

const vesitaSans = Space_Grotesk({
  variable: "--font-vesita-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const vesitaMono = JetBrains_Mono({
  variable: "--font-vesita-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vesita - Host Memorable Events",
  description:
    "A modern platform for crafting live experiences, managing RSVPs, and unlocking attendee insights.",
  metadataBase: new URL("https://vesita.app"),
  openGraph: {
    title: "Vesita - Host Memorable Events",
    description:
      "Centralize event creation, intelligent messaging, and attendee ops with Vesita.",
    type: "website",
    locale: "en_US",
    siteName: "Vesita",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${vesitaSans.variable} ${vesitaMono.variable} antialiased`}>
        <NavigationBar />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
