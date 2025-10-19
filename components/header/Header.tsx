"use client";

import Link from "next/link";
import { Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton, useClerk } from "@clerk/nextjs";

export default function Header() {
  const { signOut } = useClerk();

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* 🔹 Logo */}
        <div className="flex items-center gap-2">
          <Layers className="h-7 w-7 text-indigo-600" strokeWidth={2.5} />
          <Link href="/">
            <span className="text-xl font-bold text-gray-900">AEO Tracker</span>
          </Link>
        </div>

        {/* 🔹 Nav Links */}
        <nav className="hidden items-center gap-10 md:flex">
          <a
            href="#features"
            className="text-base font-medium text-gray-700 transition-colors hover:text-gray-900"
          >
            Features
          </a>
          <a
            href="#customers"
            className="text-base font-medium text-gray-700 transition-colors hover:text-gray-900"
          >
            Customers
          </a>
          <a
            href="#resources"
            className="text-base font-medium text-gray-700 transition-colors hover:text-gray-900"
          >
            Resources
          </a>
        </nav>

        {/* 🔹 Auth Buttons */}
        <div className="flex items-center gap-3">
          {/* If NOT logged in */}
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-base font-medium text-gray-700 hover:text-gray-900"
            >
              Sign in
            </Link>
            <Link href="/sign-up">
              <Button className="bg-indigo-600 text-base hover:bg-indigo-700">
                Sign up
              </Button>
            </Link>
          </SignedOut>

          {/* If LOGGED IN */}
          <SignedIn>
            {/* <Link href="/dashboard">
              <Button
                variant="outline"
                className="text-base border-gray-300 hover:bg-gray-100"
              >
                Dashboard
              </Button>
            </Link> */}
            {/* <Button
              variant="destructive"
              className="text-base bg-red-600 hover:bg-red-700 text-white"
              onClick={() => signOut()}
            >
              Logout
            </Button> */}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
