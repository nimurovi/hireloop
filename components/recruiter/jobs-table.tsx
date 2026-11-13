
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
    BriefcaseBusiness,
    MapPin,
    Pencil,
    Trash2,
    Users,
    Plus,
    Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import JobForm, {
    JobFormData,
} from "@/components/recruiter/job-form";

import DeleteJobDialog from "@/components/recruiter/delete-job-dialog";
import {toast} from "sonner";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Job = JobFormData & {
    _id: string;
    status?: string;
    createdAt?: string;
    applicantCount?: number;
};

export default function JobsTable() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [editingJob, setEditingJob] = useState<Job | null>(null);

    const [editLoading, setEditLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    // Fetch all jobs
    const fetchJobs = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(`${API_URL}/jobs`);
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Unable to fetch jobs.");
            }

            setJobs(result.jobs || []);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    // Open update dialog
    const handleEdit = (job: Job) => {
        setEditingJob(job);
        setEditOpen(true);
    };

    // Update job
   const handleUpdate = async (formData: JobFormData) => {
  if (!editingJob) return;

  try {
    const response = await fetch(`${API_URL}/jobs/${editingJob._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to update job.");
    }

    // Close update dialog
    setEditOpen(false);
    setEditingJob(null);

    // Show success notification
    toast.success("Job updated successfully!", {
      description: "Your job information has been updated.",
    });

    // Refresh jobs list
    await fetchJobs();
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to update job.";

    toast.error("Update failed", {
      description: message,
    });

    throw err;
  }
};

    // Open delete dialog
    const handleDeleteClick = (job: Job) => {
        setSelectedJob(job);
        setDeleteOpen(true);
    };

    // Delete job
    const handleDelete = async () => {
  if (!selectedJob) return;

  try {
    setDeleteLoading(true);

    const response = await fetch(`${API_URL}/jobs/${selectedJob._id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to delete job.");
    }

    // Remove deleted job from the table
    setJobs((previous) =>
      previous.filter((job) => job._id !== selectedJob._id)
    );

    setDeleteOpen(false);
    setSelectedJob(null);

    toast.success("Job deleted successfully!", {
      description: "The job posting has been removed.",
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to delete job.";

    toast.error("Delete failed", {
      description: message,
    });
  } finally {
    setDeleteLoading(false);
  }
};

    const formatDate = (date: string) => {
        return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        });
    };

    const isExpired = (deadline: string) => {
        const today = new Date().toISOString().slice(0, 10);
        return deadline < today;
    };

    if (loading) {
        return (
            <div className="flex min-h-64 items-center justify-center text-gray-400">
                <Loader2 className="mr-2 animate-spin" size={22} />
                Loading jobs...
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <p className="text-xs text-gray-500">
                        Manage Jobs / <span className="text-[#c5ff4a]">Job Listings & Postings</span>
                    </p>

                    <h1 className="mt-2 text-2xl font-semibold text-white">
                        Manage Job Posts
                    </h1>

                    <p className="mt-2 text-sm text-gray-400">
                        Review live listings, monitor applicants, and update job details.
                    </p>
                </div>

                <Link
                    href="/dashboard/recruiter/add-job"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-[#624bff] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#5038e8]"
                >
                    <Plus size={17} />
                    New Job Post
                </Link>
            </div>

            {/* Error */}
            {error && (
                <div className="flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                    {error}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={fetchJobs}
                        className="border-red-500/30 bg-transparent text-red-400"
                    >
                        Retry
                    </Button>
                </div>
            )}

            {/* Job count */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
                <BriefcaseBusiness size={17} />
                {jobs.length} job posting{jobs.length !== 1 ? "s" : ""}
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#151618]">
                {jobs.length === 0 ? (
                    <div className="px-6 py-16 text-center">
                        <BriefcaseBusiness
                            size={40}
                            className="mx-auto mb-4 text-gray-600"
                        />
                        <h3 className="font-semibold text-white">No jobs found</h3>
                        <p className="mt-2 text-sm text-gray-400">
                            Start by creating your first job posting.
                        </p>
                        <Link
                            href="/dashboard/recruiter/add-job"
                            className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-[#624bff] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#5038e8]"
                        >
                            <Plus size={16} />
                            Add New Job
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1050px] text-left text-sm">
                            <thead className="border-b border-white/10 bg-[#101113] text-xs uppercase tracking-wider text-gray-400">
                                <tr>
                                    <th className="px-5 py-4">Job Title & Dept</th>
                                    <th className="px-5 py-4">Company & Location</th>
                                    <th className="px-5 py-4">Type</th>
                                    <th className="px-5 py-4">Compensation</th>
                                    <th className="px-5 py-4">Applicants</th>
                                    <th className="px-5 py-4">Status</th>
                                    <th className="px-5 py-4">Deadline</th>
                                    <th className="px-5 py-4 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-white/5">
                                {jobs.map((job) => {
                                    const expired = isExpired(job.deadline);

                                    return (
                                        <tr
                                            key={job._id}
                                            className="transition hover:bg-white/[0.025]"
                                        >
                                            {/* Job title */}
                                            <td className="px-5 py-5">
                                                <p className="font-medium text-white">
                                                    {job.title}
                                                </p>
                                                <p className="mt-1 text-xs text-[#a78bfa]">
                                                    {job.category}
                                                </p>
                                            </td>

                                            {/* Company */}
                                            <td className="px-5 py-5">
                                                <p className="text-white">{job.companyName}</p>
                                                <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                                                    {job.isRemote ? (
                                                        "Remote"
                                                    ) : (
                                                        <>
                                                            <MapPin size={12} />
                                                            {job.location}
                                                        </>
                                                    )}
                                                </p>
                                            </td>

                                            {/* Type */}
                                            <td className="px-5 py-5">
                                                <Badge className="border-0 bg-white/10 text-gray-300">
                                                    {job.jobType}
                                                </Badge>
                                            </td>

                                            {/* Salary */}
                                            <td className="whitespace-nowrap px-5 py-5 text-gray-300">
                                                {job.minSalary !== null || job.maxSalary !== null ? (
                                                    <>
                                                        {job.currency} {job.minSalary ?? "—"} –{" "}
                                                        {job.maxSalary ?? "—"} / {job.frequency}
                                                    </>
                                                ) : (
                                                    "Not specified"
                                                )}
                                            </td>

                                            {/* Applicants */}
                                            <td className="px-5 py-5">
                                                <div className="flex items-center gap-2 whitespace-nowrap text-gray-300">
                                                    <Users size={15} className="text-[#a78bfa]" />
                                                    {job.applicantCount ?? 0} Applicants
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-5">
                                                <Badge
                                                    className={
                                                        expired
                                                            ? "border-0 bg-gray-500/15 text-gray-400"
                                                            : "border-0 bg-green-500/15 text-green-400"
                                                    }
                                                >
                                                    <span className="mr-1">●</span>
                                                    {expired ? "Expired" : job.status || "Active"}
                                                </Badge>
                                            </td>

                                            {/* Deadline */}
                                            <td className="whitespace-nowrap px-5 py-5">
                                                <p className="text-gray-300">
                                                    {formatDate(job.deadline)}
                                                </p>
                                                <p className="mt-1 text-xs text-gray-600">
                                                    Application deadline
                                                </p>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-5 py-5">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleEdit(job)}
                                                        className="bg-[#624bff]/20 text-[#b5a8ff] hover:bg-[#624bff]/40"
                                                    >
                                                        <Pencil size={14} />
                                                        Update
                                                    </Button>

                                                    <Button
                                                        size="icon"
                                                        variant="outline"
                                                        onClick={() => handleDeleteClick(job)}
                                                        className="border-white/10 bg-transparent text-gray-400 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
                                                    >
                                                        <Trash2 size={15} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Update Job Dialog */}
            <Dialog
                open={editOpen}
                onOpenChange={(open) => {
                    setEditOpen(open);
                    if (!open) setEditingJob(null);
                }}
            >
                <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-white/10 bg-[#101113] text-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl">
                            Update Job
                        </DialogTitle>
                    </DialogHeader>

                    {editingJob && (
                        <JobForm
                            key={editingJob._id}
                            initialData={editingJob}
                            onSubmit={handleUpdate}
                            submitLabel="Save Changes"
                            onCancel={() => {
                                setEditOpen(false);
                                setEditingJob(null);
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <DeleteJobDialog
                open={deleteOpen}
                jobTitle={selectedJob?.title || ""}
                loading={deleteLoading}
                onOpenChange={setDeleteOpen}
                onConfirm={handleDelete}
            />
        </div>
    );
}
