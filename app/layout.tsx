import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ToastProvider from "@/components/Providers/ToastProvider";
import { ConfettiProvider } from "@/components/Providers/confettiprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Courses Platform",
  description:
    "Explore a wide range of educational courses designed to enhance your skills and knowledge.",
  icons: {
    icon: "/imgs/logo1.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ConfettiProvider />
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
