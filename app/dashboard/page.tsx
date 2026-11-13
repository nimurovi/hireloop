
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import {
  normalizeDashboardRole,
  dashboardRoutes,
} from "@/lib/dashboard-role";

export default async function DashboardPage() {
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

  redirect(dashboardRoutes[role]);
}
