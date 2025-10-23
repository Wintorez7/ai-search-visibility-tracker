import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@/lib/supabase-server";



//  This matches Next.js 15’s exact expectation for route handlers
export async function GET(
  req: NextRequest,
  context: { params: Promise<Record<string, string>> }
) {
  const { id } = await context.params;
  const { userId } = await auth();

  if (!userId)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 404 });

  return NextResponse.json(data);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<Record<string, string>> }
) {
  const { id } = await context.params;
  const { userId } = await auth();

  if (!userId)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const supabase = await createClient();
  const body = await req.json();

  const { data, error } = await supabase
    .from("projects")
    .update(body)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({
    message: "Project updated successfully",
    project: data,
  });
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<Record<string, string>> }
) {
  const { id } = await context.params;
  const { userId } = await auth();

  if (!userId)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ message: "Project deleted successfully" });
}
