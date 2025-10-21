import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@/lib/supabase-server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const supabase = await createClient();

  // Get user projects
  const { data: projects } = await supabase
    .from("projects")
    .select("id")
    .eq("user_id", userId);

  if (!projects?.length) {
    return NextResponse.json([]);
  }

  const projectIds = projects.map((p) => p.id);

  // Fetch checks
  const { data: checks } = await supabase
    .from("checks")
    .select("engine, presence")
    .in("project_id", projectIds);

  if (!checks?.length) {
    return NextResponse.json([]);
  }

  // Calculate visibility per engine
  const engineStats: Record<string, { total: number; visible: number }> = {};
  for (const c of checks) {
    if (!engineStats[c.engine]) engineStats[c.engine] = { total: 0, visible: 0 };
    engineStats[c.engine].total++;
    if (c.presence) engineStats[c.engine].visible++;
  }

  const colors: Record<string, string> = {
    ChatGPT: "#10a37f",
    Gemini: "#4285f4",
    Claude: "#cc785c",
    Perplexity: "#ff6b35",
  };

  const response = Object.entries(engineStats).map(([engine, stats]) => ({
    engine,
    visibility: Math.round((stats.visible / stats.total) * 100),
    color: colors[engine] || "#6366f1",
  }));

  return NextResponse.json(response);
}
