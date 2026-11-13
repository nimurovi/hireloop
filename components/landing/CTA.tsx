import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <section
      className="relative overflow-hidden bg-[#08090b] bg-cover bg-top bg-no-repeat py-24 md:py-32"
      style={{ backgroundImage: "url('/globe.png')" }}
    >
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold text-white md:text-5xl">
          Your next role is
          <br />
          already looking for you
        </h2>
        <p className="mt-4 text-gray-400">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/signup">
            <Button className="rounded-full bg-white px-6 text-black hover:bg-gray-200">
              Create a free account
            </Button>
          </Link>
          <Link href="/pricing">
            <Button
              variant="outline"
              className="rounded-full border-white/20 bg-transparent px-6 text-white hover:bg-white/10"
            >
              View pricing
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
