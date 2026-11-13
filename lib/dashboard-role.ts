
export type DashboardRole = "seeker" | "recruiter" | "admin";

export function normalizeDashboardRole(
  role: string | null | undefined
): DashboardRole | null {
  switch (role?.toLowerCase().trim()) {
    case "seeker":
    case "job_seeker":
    case "jobseeker":
      return "seeker";

    case "recruiter":
      return "recruiter";

    case "admin":
      return "admin";

    default:
      return null;
  }
}

export const dashboardRoutes: Record<DashboardRole, string> = {
  seeker: "/dashboard/seeker",
  recruiter: "/dashboard/recruiter",
  admin: "/dashboard/admin",
};
