import { auth } from "@/lib/auth";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("hireloop");

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role } = await request.json();

    if (!["jobseeker", "recruiter", "admin"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    await db.collection("user").updateOne(
      { _id: session.user.id as unknown as import("mongodb").ObjectId },
      { $set: { role } }
    );

    return NextResponse.json({ success: true, role });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

