import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@/lib/supabase-server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("id")
    .eq("user_id", userId);

  if (!projects?.length) {
    return NextResponse.json([]);
  }

  const projectIds = projects.map((p) => p.id);

  const { data: checks } = await supabase
    .from("checks")
    .select("presence, timestamp")
    .in("project_id", projectIds)
    .order("timestamp", { ascending: true });

  if (!checks?.length) {
    return NextResponse.json([]);
  }

  // Group checks by day (simulate visibility trend)
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const grouped = days.map((day, i) => {
    const dayChecks = checks.filter((_, idx) => idx % 7 === i);
    const visibility =
      (dayChecks.filter((c) => c.presence).length / dayChecks.length || 0) *
      100;
    return { day, visibility: Math.round(visibility) };
  });

  return NextResponse.json(grouped);
}
