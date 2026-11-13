
import {
  BriefcaseBusiness,
  Bookmark,
  FileText,
  Trophy,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    title: "Saved Jobs",
    value: "12",
    icon: Bookmark,
    color: "text-blue-400",
  },
  {
    title: "Applications",
    value: "24",
    icon: FileText,
    color: "text-purple-400",
  },
  {
    title: "Interviews",
    value: "03",
    icon: BriefcaseBusiness,
    color: "text-yellow-400",
  },
  {
    title: "Offers Received",
    value: "01",
    icon: Trophy,
    color: "text-[#c5ff4a]",
  },
];

const activities = [
  {
    company: "Google",
    job: "Frontend Developer",
    status: "Under Review",
  },
  {
    company: "Microsoft",
    job: "React Developer",
    status: "Interview",
  },
  {
    company: "Amazon",
    job: "Software Engineer",
    status: "Pending",
  },
];

export default function SeekerDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-white">
          Dashboard Overview
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          Track your job search progress.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card
              key={stat.title}
              className="border-white/10 bg-[#111316] text-white"
            >
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm text-gray-400">{stat.title}</p>
                  <h3 className="mt-3 text-3xl font-bold">{stat.value}</h3>
                </div>
                <div className={`rounded-xl bg-white/5 p-3 ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-white/10 bg-[#111316] text-white">
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-5">
            {activities.map((activity) => (
              <div
                key={activity.company}
                className="flex flex-col justify-between gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center"
              >
                <div>
                  <h3 className="font-semibold">{activity.job}</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    {activity.company}
                  </p>
                </div>

                <Badge className="w-fit bg-[#c5ff4a]/10 text-[#c5ff4a] hover:bg-[#c5ff4a]/20">
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
