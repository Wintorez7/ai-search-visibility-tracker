"use client";

import Link from "next/link";
import { useState } from "react";
import { Layers, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton, useClerk } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { signOut } = useClerk();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Features", href: "#features" },
    { name: "Customers", href: "#customers" },
    { name: "Resources", href: "#resources" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Layers className="h-7 w-7 text-indigo-600" strokeWidth={2.5} />
          <Link href="/">
            <span className="text-xl font-bold text-gray-900">AEO Tracker</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-base font-medium text-gray-700 transition-colors hover:text-indigo-600"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {/* Signed Out State */}
          <SignedOut>
            <Link
              href="/sign-in"
              className="hidden text-base font-medium text-gray-700 transition-colors hover:text-indigo-600 md:block"
            >
              Sign in
            </Link>
            <Link href="/sign-up">
              <Button className="bg-indigo-600 text-base hover:bg-indigo-700">
                Sign up
              </Button>
            </Link>
          </SignedOut>

          {/* Signed In State */}
          <SignedIn>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="hidden gap-2 border-gray-300 hover:bg-gray-100 md:flex"
                >
                  Dashboard
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="w-full cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/config" className="w-full cursor-pointer">
                    Configuration
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/evals" className="w-full cursor-pointer">
                    Evaluations
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                }
              }}
            />
          </SignedIn>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-gray-700 transition-colors hover:text-indigo-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="text-base font-medium text-gray-700 transition-colors hover:text-indigo-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="bg-indigo-600 text-base hover:bg-indigo-700 w-full">
                    Sign up
                  </Button>
                </Link>
              </SignedOut>
              
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="text-base font-medium text-gray-700 transition-colors hover:text-indigo-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/config"
                  className="text-base font-medium text-gray-700 transition-colors hover:text-indigo-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Configuration
                </Link>
                <Link
                  href="/dashboard/evals"
                  className="text-base font-medium text-gray-700 transition-colors hover:text-indigo-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Evaluations
                </Link>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign out
                </Button>
              </SignedIn>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}