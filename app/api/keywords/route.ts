import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@/lib/supabase-server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json([], { status: 401 });

  const supabase = await createClient();

  // Get all projects for this user
  const { data: projects } = await supabase
    .from("projects")
    .select("id")
    .eq("user_id", userId);

  if (!projects?.length) return NextResponse.json([]);

  const projectIds = projects.map((p) => p.id);

  // Get all checks
  const { data: checks } = await supabase
    .from("checks")
    .select("*")
    .in("project_id", projectIds);

  if (!checks?.length) return NextResponse.json([]);

  // Aggregate by keyword
  const grouped: Record<string, any> = {};
  for (const c of checks) {
    if (!grouped[c.keyword]) {
      grouped[c.keyword] = {
        keyword: c.keyword,
        chatgpt: false,
        gemini: false,
        claude: false,
        perplexity: false,
        positions: [],
        visibilityCount: 0,
        totalCount: 0,
      };
    }
    grouped[c.keyword][c.engine.toLowerCase()] = !!c.presence;
    grouped[c.keyword].positions.push(c.position || 0);
    grouped[c.keyword].visibilityCount += c.presence ? 1 : 0;
    grouped[c.keyword].totalCount++;
  }

  // Map data
  const result = Object.values(grouped).map((k: any, i) => ({
    id: i + 1,
    keyword: k.keyword,
    chatgpt: k.chatgpt,
    gemini: k.gemini,
    claude: k.claude,
    perplexity: k.perplexity,
    visibility: Math.round((k.visibilityCount / k.totalCount) * 100),
    position:
      k.positions.reduce((sum: number, p: number) => sum + p, 0) /
      k.positions.length,
    trend: Math.random() > 0.6 ? "up" : Math.random() > 0.3 ? "neutral" : "down",
    trendValue: Math.floor(Math.random() * 15),
  }));

  return NextResponse.json(result);
}
