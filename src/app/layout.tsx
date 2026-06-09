import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SaiBumi Explore - CMS Destinasi Wisata Lampung",
  description: "Dashboard administrasi pariwisata Lampung SaiBumi Explore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#F8FAFC] text-[#0F172A]">{children}</body>
    </html>
  );
}

