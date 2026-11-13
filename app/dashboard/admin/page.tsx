
import { Users, Building2, BriefcaseBusiness, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { title: "Total Users", value: "2,450", icon: Users },
  { title: "Companies", value: "185", icon: Building2 },
  { title: "Total Jobs", value: "1,280", icon: BriefcaseBusiness },
  { title: "Revenue", value: "$12,500", icon: Wallet },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-white">Platform Overview</h2>
        <p className="mt-1 text-sm text-gray-400">
          Monitor and manage the Hireloop platform.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="border-white/10 bg-[#111316] text-white">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm text-gray-400">{item.title}</p>
                  <h3 className="mt-3 text-3xl font-bold">{item.value}</h3>
                </div>
                <Icon className="text-[#c5ff4a]" size={25} />
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-white/10 bg-[#111316] text-white">
        <CardHeader>
          <CardTitle>Platform Activity</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-400">
          User registrations, company approvals, and job activities will appear here.
        </CardContent>
      </Card>
    </div>
  );
}
