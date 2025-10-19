"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode, Suspense } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import Loading from "./loading";
import CommonLayout from "@/components/CommonLayout";

const inter = Inter({ subsets: ["latin"] });



interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`antialiased ${inter.className}`}>
          <Suspense fallback={<Loading />}>
            <CommonLayout>{children}</CommonLayout>
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
