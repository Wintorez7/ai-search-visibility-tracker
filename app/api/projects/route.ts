import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";
import { createClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  // ✅ Await auth() to get userId
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const supabase = await createClient();
  const body = await req.json();
  const { domain, brand, competitors, keywords } = body;

  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        user_id: userId, // ✅ Clerk user ID
        domain,
        brand,
        competitors,
        keywords,
      },
    ])
    .select();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({
    message: "Project created successfully",
    project: data[0],
  });
}

export async function GET() {
  const { userId } = await auth(); // ✅ same fix
  if (!userId)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data);
}
