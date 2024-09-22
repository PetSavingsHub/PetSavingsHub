import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pat Pet",
  description: "Find the perfect for your fluffy friends!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={
        cn(
          inter.className,
          "w-screen h-screen flex justify-center"
        )}>
        <div className="h-screen w-full max-w-[1630px]">
          {children}
        </div>
        <Script async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2770348903814124"
                crossOrigin="anonymous"></Script>
      </body>
    </html>
  );
}
