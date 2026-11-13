
"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import JobForm from "@/components/recruiter/job-form";
import type { JobFormData } from "@/components/recruiter/job-form";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AddJobPage() {
  const router = useRouter();

  const handleCreateJob = async (formData: JobFormData) => {
    const response = await fetch(`${API_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      toast.error(result.message || "Failed to create job.");
      throw new Error(result.message || "Failed to create job.");
    }

    toast.success("Job created successfully!", {
      description: "Your job has been published.",
      duration: 2000,
    });

    // Redirect to Manage Jobs after successful creation
    router.push("/dashboard/recruiter/jobs");
  };

  return (
    <div className="min-h-screen bg-[#101113] p-4 text-white sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-7 border-b border-white/10 pb-6">
          <p className="text-xs text-gray-500">
            Manage Jobs / Create New Listing
          </p>

          <h1 className="mt-2 text-2xl font-semibold">
            Post a New Job
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Fill in the position specifications to attract qualified talent.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#151618] p-5 sm:p-7">
          <JobForm
            onSubmit={handleCreateJob}
            submitLabel="Publish Job"
          />
        </div>
      </div>
    </div>
  );
}
