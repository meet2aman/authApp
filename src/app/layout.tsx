import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth_app",
  description: "Fullstack authentication app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364]`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
