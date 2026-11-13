
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type JobFormData = {
  title: string;
  companyName: string;
  category: string;
  jobType: string;
  isRemote: boolean;
  location: string;
  deadline: string;
  minSalary: number | null;
  maxSalary: number | null;
  currency: string;
  frequency: string;
  responsibilities: string;
  requirements: string;
};

export const emptyJob: JobFormData = {
  title: "",
  companyName: "",
  category: "Engineering & Tech",
  jobType: "Full-time",
  isRemote: false,
  location: "",
  deadline: "",
  minSalary: null,
  maxSalary: null,
  currency: "USD",
  frequency: "per hour",
  responsibilities: "",
  requirements: "",
};

type JobFormProps = {
  initialData?: JobFormData;
  onSubmit: (data: JobFormData) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
};

const inputClass =
  "w-full rounded-lg border border-white/10 bg-[#202023] px-3 py-3 text-sm text-white outline-none focus:border-[#6c47ff]";

const labelClass = "mb-2 block text-sm font-medium text-gray-300";

export default function JobForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "Publish Job",
}: JobFormProps) {
  const [form, setForm] = useState<JobFormData>({
    ...emptyJob,
    ...initialData,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = (
    name: keyof JobFormData,
    value: string | boolean | number | null
  ) => {
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (
      form.minSalary !== null &&
      form.maxSalary !== null &&
      form.minSalary > form.maxSalary
    ) {
      setError("Minimum salary cannot exceed maximum salary.");
      return;
    }

    try {
      setLoading(true);
      await onSubmit(form);
      
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </p>
      )}

      {/* Basic Information */}
      <section className="space-y-5">
        <h3 className="font-semibold text-white">
          <span className="mr-2 text-[#8b72ff]">●</span>
          1. Basic Information
        </h3>

        <div>
          <Label className={labelClass}>Job Title *</Label>
          <Input
            required
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="e.g. Frontend Developer"
            className={inputClass}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label className={labelClass}>Company Name *</Label>
            <Input
              required
              value={form.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
              placeholder="Company name"
              className={inputClass}
            />
          </div>

          <div>
            <Label className={labelClass}>Job Category *</Label>
            <select
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
              className={inputClass}
            >
              {[
                "Engineering & Tech",
                "Design & Creative",
                "Marketing",
                "Sales",
                "Finance & Accounting",
                "Human Resources",
                "Customer Support",
                "Education",
                "Other",
              ].map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <Label className={labelClass}>Job Type *</Label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {["Full-time", "Part-time", "Contract", "Internship"].map(
              (type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateField("jobType", type)}
                  className={`rounded-lg border p-3 text-sm ${
                    form.jobType === type
                      ? "border-[#6c47ff] bg-[#6c47ff]/15 text-white"
                      : "border-white/10 bg-[#202023] text-gray-400"
                  }`}
                >
                  {type}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* Location and Compensation */}
      <section className="space-y-5 border-t border-white/10 pt-6">
        <h3 className="font-semibold text-white">
          <span className="mr-2 text-[#8b72ff]">●</span>
          2. Location, Compensation & Timeline
        </h3>

        <label className="flex items-center justify-between rounded-lg bg-[#202023] p-4 text-sm text-gray-300">
          <span>
            <span className="block font-medium text-white">
              Remote Work Allowed
            </span>
            <span className="mt-1 block text-xs text-gray-500">
              Allow candidates to work remotely.
            </span>
          </span>
          <input
            type="checkbox"
            checked={form.isRemote}
            onChange={(e) => updateField("isRemote", e.target.checked)}
            className="h-5 w-5 accent-[#8b72ff]"
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label className={labelClass}>Job Location *</Label>
            <Input
              required
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="Dhaka, Bangladesh"
              className={inputClass}
            />
          </div>

          <div>
            <Label className={labelClass}>Application Deadline *</Label>
            <Input
              required
              type="date"
              value={form.deadline}
              onChange={(e) => updateField("deadline", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Label className={labelClass}>Minimum Salary</Label>
            <Input
              type="number"
              min="0"
              value={form.minSalary ?? ""}
              onChange={(e) =>
                updateField(
                  "minSalary",
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
              placeholder="Minimum"
              className={inputClass}
            />
          </div>

          <div>
            <Label className={labelClass}>Maximum Salary</Label>
            <Input
              type="number"
              min="0"
              value={form.maxSalary ?? ""}
              onChange={(e) =>
                updateField(
                  "maxSalary",
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
              placeholder="Maximum"
              className={inputClass}
            />
          </div>

          <div>
            <Label className={labelClass}>Currency</Label>
            <select
              value={form.currency}
              onChange={(e) => updateField("currency", e.target.value)}
              className={inputClass}
            >
              {["USD", "BDT", "EUR", "GBP"].map((currency) => (
                <option key={currency}>{currency}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <Label className={labelClass}>Salary Frequency</Label>
          <select
            value={form.frequency}
            onChange={(e) => updateField("frequency", e.target.value)}
            className={inputClass}
          >
            {["per hour", "per day", "per month", "per year"].map(
              (frequency) => (
                <option key={frequency}>{frequency}</option>
              )
            )}
          </select>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="space-y-5 border-t border-white/10 pt-6">
        <h3 className="font-semibold text-white">
          <span className="mr-2 text-[#8b72ff]">●</span>
          3. Responsibilities & Requirements
        </h3>

        <div>
          <Label className={labelClass}>Key Responsibilities *</Label>
          <Textarea
            required
            rows={5}
            value={form.responsibilities}
            onChange={(e) =>
              updateField("responsibilities", e.target.value)
            }
            placeholder="Describe the main responsibilities..."
            className={inputClass}
          />
        </div>

        <div>
          <Label className={labelClass}>
            Qualifications & Requirements *
          </Label>
          <Textarea
            required
            rows={5}
            value={form.requirements}
            onChange={(e) => updateField("requirements", e.target.value)}
            placeholder="Describe the required skills and qualifications..."
            className={inputClass}
          />
        </div>
      </section>

      <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-white/10 bg-transparent text-white hover:bg-white/5"
          >
            Cancel
          </Button>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="bg-[#624bff] text-white hover:bg-[#5038e8]"
        >
          {loading ? "Please wait..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
