import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@/lib/supabase-server";

export async function POST() {
  const { userId } = await auth();
   console.log("🧠 Clerk User ID:", userId);
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("id")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1);

  if (!projects || projects.length === 0) {
    return NextResponse.json({ error: "No projects found" }, { status: 404 });
  }

  const projectId = projects[0].id;

  const engines = ["ChatGPT", "Gemini", "Claude", "Perplexity"];
  const keywords = ["ai transport", "cheap transport booking", "online trip planner"];

  const fakeChecks = engines.flatMap((engine) =>
    keywords.map((keyword) => ({
      project_id: projectId,
      engine,
      keyword,
      position: Math.floor(Math.random() * 6) + 1,
      presence: Math.random() > 0.3,
      citations_count: Math.floor(Math.random() * 5),
      observed_urls: ["saraltransport.in"],
    }))
  );

  const { error } = await supabase.from("checks").insert(fakeChecks);

  if (error) {
    console.error("Insert error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    inserted: fakeChecks.length,
    projectId,
  });
}
