import {
  Search,
  DollarSign,
  Building2,
  Bookmark,
  MousePointerClick,
  FileText,
  Target,
  TrendingUp,
} from "lucide-react";

const jobListings = [
  {
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25-€40/hour",
  },
  {
    title: "Backend Engineer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "London, UK",
    type: "Remote",
    salary: "€30-€50/hour",
  },
  {
    title: "Product Designer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "Berlin, Germany",
    type: "On-site",
    salary: "€28-€45/hour",
  },
  {
    title: "Data Scientist",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "San Francisco, USA",
    type: "Remote",
    salary: "€35-€55/hour",
  },
  {
    title: "DevOps Engineer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "Toronto, Canada",
    type: "Hybrid",
    salary: "€30-€48/hour",
  },
  {
    title: "Mobile Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "Amsterdam, NL",
    type: "On-site",
    salary: "€27-€42/hour",
  },
];

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Find the best roles with AI-powered job discovery",
  },
  {
    icon: DollarSign,
    title: "Salary Insights",
    description: "Get verified compensation data before you apply",
  },
  {
    icon: Building2,
    title: "Top Companies",
    description: "Access curated listings from industry-leading employers",
  },
  {
    icon: Bookmark,
    title: "Saved Jobs",
    description: "Bookmark roles and track your application pipeline",
  },
  {
    icon: MousePointerClick,
    title: "One-Click Apply",
    description: "Submit applications instantly with your saved profile",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Create tailored resumes for every opportunity",
  },
  {
    icon: Target,
    title: "Skill-Based Matching",
    description: "Get matched to roles that fit your unique skill set",
  },
  {
    icon: TrendingUp,
    title: "Career Growth Resources",
    description: "Level up with guides, courses, and mentorship tools",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-[#08090b] px-5 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Part 1: Smart Job Discovery */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-gray-400">
            ✦ SMART JOB DISCOVERY ✦
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
            The roles you&apos;d never find by searching
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {jobListings.map((job) => (
            <div
              key={job.title}
              className="rounded-2xl border border-white/10 bg-[#111316] p-6"
            >
              <h3 className="text-lg font-semibold text-white">{job.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{job.description}</p>

              <div className="mt-4 flex gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                  <span className="inline-block h-2 w-2 rounded-full bg-pink-500" />
                  {job.location}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                  <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                  {job.type}
                </span>
              </div>

              <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-gray-400">
                <DollarSign className="h-3.5 w-3.5" />
                {job.salary}
              </div>

              <a
                href="#"
                className="mt-4 block text-sm text-white transition-colors hover:text-purple-400"
              >
                Apply Now →
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button className="rounded-full border border-white/20 bg-transparent px-6 py-2 text-sm text-white transition-colors hover:border-white/40">
            View all job open
          </button>
        </div>

        {/* Part 2: Features Grid */}
        <div className="mt-32 text-center">
          <p className="text-xs uppercase tracking-widest text-gray-400">
            ✦ FEATURES JOB ✦
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
            Everything you need to succeed
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="p-4">
                <Icon className="mb-3 h-5 w-5 text-gray-400" />
                <h3 className="text-sm font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
