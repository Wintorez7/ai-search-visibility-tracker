import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@/lib/supabase-server";

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const supabase = await createClient();

  // 🆕 Read optional projectId from query params
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  let projectIds: string[] = [];

  // If projectId is given, only fetch that one
  if (projectId) {
    projectIds = [projectId];
    console.log("🎯 Filtering metrics for specific project:", projectId);
  } else {
    // Otherwise, fetch all user projects (global view)
    const { data: projects, error: projectError } = await supabase
      .from("projects")
      .select("id")
      .eq("user_id", userId);

    if (projectError) {
      console.error("⚠️ Project fetch error:", projectError.message);
      return NextResponse.json({ error: projectError.message }, { status: 400 });
    }

    projectIds = projects?.map((p) => p.id) || [];
  }

  if (!projectIds.length) {
    console.log("❌ No projects found for user");
    return NextResponse.json({
      visibilityScore: 0,
      avgPosition: 0,
      avgCitations: 0,
      enginesTracked: 0,
    });
  }

  const { data: checks, error: checkError } = await supabase
    .from("checks")
    .select("*")
    .in("project_id", projectIds);

  if (checkError) {
    console.error("⚠️ Checks fetch error:", checkError.message);
    return NextResponse.json({ error: checkError.message }, { status: 400 });
  }

  if (!checks?.length) {
    console.log("❌ No checks found for these projects");
    return NextResponse.json({
      visibilityScore: 0,
      avgPosition: 0,
      avgCitations: 0,
      enginesTracked: 0,
    });
  }

  // 📊 Calculate metrics
  const totalChecks = checks.length;
  const avgPosition =
    checks.reduce((sum, c) => sum + (c.position || 0), 0) / totalChecks;
  const avgCitations =
    checks.reduce((sum, c) => sum + (c.citations_count || 0), 0) / totalChecks;
  const visibilityScore =
    (checks.filter((c) => c.presence).length / totalChecks) * 100;
  const enginesTracked = new Set(checks.map((c) => c.engine)).size;

  const metrics = {
    visibilityScore,
    avgPosition,
    avgCitations,
    enginesTracked,
  };

  console.log("✅ Metrics:", metrics);

  return NextResponse.json(metrics);
}
