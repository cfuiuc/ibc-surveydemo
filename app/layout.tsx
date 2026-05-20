import type { Metadata } from "next";
import { Montserrat, Source_Sans_3 } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "How IBC Consultants Use A.I. — Spring 2026 Survey",
  description:
    "94 Illinois Business Consulting members told us how they use AI. Results from the Spring 2026 student survey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-il-storm-10 font-body">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
