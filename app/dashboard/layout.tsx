
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { normalizeDashboardRole } from "@/lib/dashboard-role";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const role = normalizeDashboardRole(
    (session.user as typeof session.user & {
      role?: string;
    }).role
  );

  if (!role) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#08090b]">
      <DashboardSidebar role={role} />

      <main className="min-h-screen lg:pl-64">
        <DashboardHeader
          title={`${role} Dashboard`}
          name={session.user.name}
          image={session.user.image || undefined}
        />

        <div className="p-5 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
