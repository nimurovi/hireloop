"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Browse Jobs", href: "#jobs" },
  { label: "Company", href: "#companies" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08090b]/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Hireloop"
            width={150}
            height={45}
            priority
            className="h-auto w-28 md:w-32"
          />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-gray-400 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-4 md:flex">
          {isPending ? (
            <div className="h-8 w-24 animate-pulse rounded-lg bg-white/5" />
          ) : session?.user ? (
            /* Logged in — show user info + sign out */
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#6c47ff] text-xs font-semibold text-white">
                  {session.user.name?.charAt(0).toUpperCase() || <User className="h-3.5 w-3.5" />}
                </div>
                <span className="max-w-[120px] truncate text-sm font-medium text-white">
                  {session.user.name}
                </span>
              </div>
              <Button
                onClick={handleSignOut}
                variant="ghost"
                className="gap-1.5 text-sm text-gray-400 hover:bg-white/5 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            /* Not logged in — show Sign In + Get Started */
            <>
              <Link href="/signin">
                <Button
                  variant="ghost"
                  className="text-sm text-gray-300 hover:bg-transparent hover:text-white"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="rounded-full bg-[#ff4d4d] px-6 text-sm font-medium text-white hover:bg-[#e64444]">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6 text-white" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="border-white/10 bg-[#08090b] text-white"
            >
              <div className="mt-10 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg text-gray-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="mt-4 flex flex-col gap-3">
                  {session?.user ? (
                    <>
                      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6c47ff] text-sm font-semibold text-white">
                          {session.user.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <span className="truncate text-sm font-medium text-white">
                          {session.user.name}
                        </span>
                      </div>
                      <Button
                        onClick={handleSignOut}
                        variant="outline"
                        className="gap-2 border-white/10 text-gray-300 hover:bg-white/5 hover:text-white"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/signin">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-gray-300"
                        >
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/signup">
                        <Button className="w-full bg-[#ff4d4d] text-white hover:bg-[#e64444]">
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
