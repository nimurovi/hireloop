
import Link from "next/link";
import {
  BriefcaseBusiness,
  Users,
  Eye,
  FileText,
  PlusCircle,
  ArrowRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const stats = [
  { title: "Active Jobs", value: "18", icon: BriefcaseBusiness },
  { title: "Total Applicants", value: "245", icon: Users },
  { title: "Job Views", value: "1,820", icon: Eye },
  { title: "New Applications", value: "32", icon: FileText },
];

export default function RecruiterDashboard() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-white">
          Recruitment Overview
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          Monitor your hiring activities.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="border-white/10 bg-[#111316] text-white"
            >
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm text-gray-400">{item.title}</p>
                  <h3 className="mt-3 text-3xl font-bold">
                    {item.value}
                  </h3>
                </div>

                <Icon className="text-[#c5ff4a]" size={25} />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">
          Quick Actions
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">

          {/* Add Job */}
          <Link href="/dashboard/recruiter/add-job">
            <Card className="group cursor-pointer border-white/10 bg-[#111316] text-white transition hover:border-[#c5ff4a]/50">
              <CardContent className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-[#c5ff4a]/10 p-3">
                    <PlusCircle size={24} className="text-[#c5ff4a]" />
                  </div>

                  <div>
                    <h3 className="font-semibold">Add New Job</h3>
                    <p className="mt-1 text-sm text-gray-400">
                      Create and publish a job vacancy.
                    </p>
                  </div>
                </div>

                <ArrowRight
                  size={20}
                  className="text-gray-500 transition group-hover:translate-x-1 group-hover:text-[#c5ff4a]"
                />
              </CardContent>
            </Card>
          </Link>

          {/* Manage Jobs */}
          <Link href="/dashboard/recruiter/jobs">
            <Card className="group cursor-pointer border-white/10 bg-[#111316] text-white transition hover:border-[#c5ff4a]/50">
              <CardContent className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-[#c5ff4a]/10 p-3">
                    <BriefcaseBusiness size={24} className="text-[#c5ff4a]" />
                  </div>

                  <div>
                    <h3 className="font-semibold">Manage Jobs</h3>
                    <p className="mt-1 text-sm text-gray-400">
                      View and manage your job postings.
                    </p>
                  </div>
                </div>

                <ArrowRight
                  size={20}
                  className="text-gray-500 transition group-hover:translate-x-1 group-hover:text-[#c5ff4a]"
                />
              </CardContent>
            </Card>
          </Link>

        </div>
      </div>

      {/* Recent Activity */}
      <Card className="border-white/10 bg-[#111316] text-white">
        <CardHeader>
          <CardTitle>Recent Hiring Activity</CardTitle>
        </CardHeader>

        <CardContent className="text-sm text-gray-400">
          Your recent applicants and job activities will appear here.
        </CardContent>
      </Card>

    </div>
  );
}
