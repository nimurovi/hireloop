import { Briefcase, BarChart3, Users, Star } from "lucide-react";

const stats = [
  { value: "50K", label: "Active Jobs", icon: Briefcase },
  { value: "12K", label: "Companies", icon: BarChart3 },
  { value: "2M", label: "Job Seekers", icon: Users },
  { value: "97%", label: "Satisfaction Rate", icon: Star },
];

export default function Stats() {
  return (
    <section className="bg-[#08090b] px-5 pb-24 text-white">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-[#111316] p-6"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
                <Icon className="h-4 w-4 text-gray-400" />
              </div>
              <h3 className="text-3xl font-bold text-white md:text-4xl">
                {stat.value}
              </h3>
              <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
