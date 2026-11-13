
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import {
  DashboardRole,
  normalizeDashboardRole,
  dashboardRoutes,
} from "@/lib/dashboard-role";

export async function requireDashboardRole(
  requiredRole: DashboardRole
) {
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

  if (role !== requiredRole) {
    redirect(dashboardRoutes[role]);
  }

  return session;
}
