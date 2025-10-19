"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode, Suspense } from "react";
import { usePathname } from "next/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import Loading from "./loading";
import CommonLayout from "@/components/CommonLayout";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();

  //  Hide CommonLayout for specific pages (dashboard, auth)
  const hideCommonLayout =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up");

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`antialiased ${inter.className}`}>
          <Suspense fallback={<Loading />}>
            {/* ✅ Render conditionally */}
            {hideCommonLayout ? (
              children
            ) : (
              <CommonLayout>{children}</CommonLayout>
            )}
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
