"use client";

import { useState } from "react";
import { Plus, Rocket, Star, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Starter",
    icon: <Rocket className="h-5 w-5 text-purple-400" />,
    monthlyPrice: 0,
    yearlyPrice: 0,
    label: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    icon: <Zap className="h-5 w-5 text-purple-400" />,
    monthlyPrice: 17,
    yearlyPrice: Math.round(17 * 12 * 0.85 / 12),
    label: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    icon: <Star className="h-5 w-5 text-purple-400" />,
    monthlyPrice: 99,
    yearlyPrice: Math.round(99 * 12 * 0.85 / 12),
    label: "Start building your insights hub:",
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly"
  );

  return (
    <section id="pricing" className="bg-[#08090b] px-5 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-gray-400">
            ✦ PRICING ✦
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
            Pay for the leverage, not the listings
          </h2>
        </div>

        {/* Billing Toggle */}
        <div className="mt-10 flex items-center justify-center gap-1">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`rounded-full px-5 py-1.5 text-sm font-medium transition-all ${
                billingPeriod === "monthly"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-1.5 text-sm font-medium transition-all ${
                billingPeriod === "yearly"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Yearly
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-[10px]">
                15%
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const price =
              billingPeriod === "monthly"
                ? plan.monthlyPrice
                : plan.yearlyPrice;

            return (
              <div
                key={plan.name}
                className={`rounded-2xl border bg-[#111316] p-6 ${
                  plan.highlighted
                    ? "border-purple-500/50 shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)]"
                    : "border-white/10"
                }`}
              >
                <div className="mb-4 flex items-center gap-2">
                  {plan.icon}
                  <span className="text-sm font-medium text-gray-400">
                    {plan.name}
                  </span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    ${price}
                  </span>
                  <span className="text-sm text-gray-400">/month</span>
                </div>

                <p className="mt-6 text-sm text-gray-400">{plan.label}</p>

                <ul className="mt-4 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-gray-300"
                    >
                      <Plus className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-8 w-full rounded-lg py-2.5 text-sm font-medium transition-colors ${
                    plan.highlighted
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-white/10 text-white hover:bg-white/15"
                  }`}
                >
                  Choose This Plan →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
