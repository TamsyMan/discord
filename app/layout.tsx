import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./globalRedux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discord Clone",
  description: "A Discord clone made by Henry Tamlyn",
  icons: "https://img.icons8.com/?size=100&id=30998&format=png&color=000000"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={`${inter.className} text-white overflow-hidden`}>{children}</body>
      </html>
    </Providers>
  );
}
