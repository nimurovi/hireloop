
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Bookmark,
  FileText,
  CreditCard,
  Settings,
  Users,
  Building2,
  Wallet,
  Menu,
  X,
  PlusCircle,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export type UserRole = "seeker" | "recruiter" | "admin";

const dashboardMenus = {
  seeker: [
    {
      label: "Dashboard",
      href: "/dashboard/seeker",
      icon: LayoutDashboard,
    },
    {
      label: "Jobs",
      href: "/dashboard/seeker/jobs",
      icon: BriefcaseBusiness,
    },
    {
      label: "Saved Jobs",
      href: "/dashboard/seeker/saved-jobs",
      icon: Bookmark,
    },
    {
      label: "Applications",
      href: "/dashboard/seeker/applications",
      icon: FileText,
    },
    {
      label: "Billing",
      href: "/dashboard/seeker/billing",
      icon: CreditCard,
    },
    {
      label: "Settings",
      href: "/dashboard/seeker/settings",
      icon: Settings,
    },
  ],

  recruiter: [
    {
      label: "Dashboard",
      href: "/dashboard/recruiter",
      icon: LayoutDashboard,
    },
    {
      label: "Add Job",
      href: "/dashboard/recruiter/add-job",
      icon: PlusCircle,
    },
    {
      label: "Manage Jobs",
      href: "/dashboard/recruiter/jobs",
      icon: BriefcaseBusiness,
    },
    {
      label: "Applications",
      href: "/dashboard/recruiter/applications",
      icon: FileText,
    },
    {
      label: "Settings",
      href: "/dashboard/recruiter/settings",
      icon: Settings,
    },
  ],
  admin: [
    {
      label: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Users",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      label: "Companies",
      href: "/dashboard/admin/companies",
      icon: Building2,
    },
    {
      label: "Jobs",
      href: "/dashboard/admin/jobs",
      icon: BriefcaseBusiness,
    },
    {
      label: "Payments",
      href: "/dashboard/admin/payments",
      icon: Wallet,
    },
    {
      label: "Settings",
      href: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
};

interface DashboardSidebarProps {
  role: UserRole;
}

export default function DashboardSidebar({
  role,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const menus = dashboardMenus[role];

  const SidebarContent = (
    <div className="flex h-full flex-col bg-[#101214] text-white">

      {/* Logo */}
      <div className="flex h-20 items-center justify-between px-6">
        <Link href="/" className="text-2xl font-bold">
          Hire<span className="text-[#c5ff4a]">loop.</span>
        </Link>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setOpen(false)}
        >
          <X size={20} />
        </Button>
      </div>

      <Separator className="bg-white/10" />

      {/* User Role */}
      <div className="px-6 py-5">
        <p className="text-xs uppercase tracking-widest text-gray-500">
          {role === "seeker"
            ? "Job Seeker"
            : role === "recruiter"
              ? "Recruiter"
              : "Administrator"}
        </p>
        <p className="mt-1 text-sm font-medium text-white">
          Workspace
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4">
        {menus.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            (pathname.startsWith(item.href + "/") &&
              item.href !== `/dashboard/${role}`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${isActive
                ? "bg-[#c5ff4a] text-black"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-5">
        <Separator className="mb-5 bg-white/10" />

        <p className="text-center text-xs text-gray-600">
          © 2026 Hireloop. All rights reserved.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-50 border-white/10 bg-[#101214] text-white lg:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu size={20} />
      </Button>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/10 lg:block">
        {SidebarContent}
      </aside>

      {/* Mobile sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
          />

          <aside className="relative h-full w-72">
            {SidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
