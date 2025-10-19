import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Layers, Plus, User } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-primary backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-6">
         {/* 🔹 Logo */}
        <div className="flex items-center gap-2">
          <Layers className="h-7 w-7 text-indigo-600" strokeWidth={2.5} />
          <Link href="/">
            <span className="text-xl font-bold text-gray-900">AEO Tracker</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
            <span className="text-lg font-bold text-white">AI</span>
          </div>
          <h1 className="text-xl font-semibold text-white">
            AI Search Visibility Dashboard
          </h1> */}
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" className="gap-2 bg-white text-primary hover:bg-black/20">
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
          <Button size="sm" variant="outline" className="gap-2 border-white/30 bg-white/10 text-black hover:bg-black/20">
            <Plus className="h-4 w-4" />
            Add Keyword
          </Button>
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
      </div>
    </header>
  );
};
