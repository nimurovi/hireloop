import { Search, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const trendingPositions = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#08090b] bg-cover bg-bottom bg-no-repeat px-5 pt-16 text-white"
      style={{ backgroundImage: "url('/globe.png')" }}
    >
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-widest text-gray-300 backdrop-blur-sm">
          <span className="text-base">🧳</span>
          <span className="font-medium">50,000+ NEW JOBS THIS MONTH</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Find Your Dream Job Today
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400">
          HireLoop connects top talent with world-class companies. Browse thousands of
          curated opportunities and land your next role — faster.
        </p>

        {/* Search Bar */}
        <div className="mx-auto mt-10 flex max-w-2xl items-center rounded-full border border-white/10 bg-[#111316]">
          <div className="flex flex-1 items-center gap-3 px-5 py-3.5">
            <Search className="h-5 w-5 shrink-0 text-gray-500" />
            <input
              type="text"
              placeholder="Job title, skill or company"
              className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
            />
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex flex-1 items-center gap-3 px-5 py-3.5">
            <MapPin className="h-5 w-5 shrink-0 text-gray-500" />
            <input
              type="text"
              placeholder="Location or Remote"
              className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
            />
          </div>
          <button className="m-1.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#6c47ff] text-white transition hover:bg-[#5a38e0]">
            <Search className="h-4 w-4" />
          </button>
        </div>

        {/* Trending Positions */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-gray-500">Trending Position</span>
          {trendingPositions.map((position) => (
            <Badge
              key={position}
              variant="outline"
              className="border-white/10 bg-transparent text-xs font-normal text-gray-300 hover:border-white/20"
            >
              {position}
            </Badge>
          ))}
        </div>

        {/* Text over globe area */}
        <div className="mt-48 pb-16 md:mt-64">
          <p className="text-lg text-gray-400 md:text-xl">
            Assisting over{" "}
            <span className="font-bold text-white">15,000 job seekers</span>
            <br />
            find their dream positions.
          </p>
        </div>
      </div>
    </section>
  );
}
