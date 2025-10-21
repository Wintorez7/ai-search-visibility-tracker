"use client";

import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { KPICards } from "./components/KPICards";
import { VisibilityTrendChart } from "./components/VisibilityTrendChart";
import { EngineBreakdownChart } from "./components/EngineBreakdownChart";
import { KeywordTable } from "./components/KeywordTable";
import { RecommendationsPanel } from "./components/RecommendationsPanel";
import { ProjectSelector } from "./components/ProjectSelector";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export default function DashboardPage() {
  const [projectId, setProjectId] = useState("");
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchMetrics = async (id: string) => {
    if (!id) return;
    setLoading(true);
    const res = await fetch(`/api/metrics?projectId=${id}`, { credentials: "include" });
    const data = await res.json();
    setMetrics(data);
    setLoading(false);
  };

  // fetch on project change
  useEffect(() => {
    if (projectId) fetchMetrics(projectId);
  }, [projectId]);

  const handleRefresh = () => {
    if (projectId) {
      fetchMetrics(projectId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft dark:bg-gray-950">
      <Header />

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* 🔹 Top Controls: Project Selector + Refresh */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <ProjectSelector onSelect={setProjectId} />

          <Button
            onClick={handleRefresh}
            disabled={loading || !projectId}
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
          >
            <RotateCcw
              className={`h-4 w-4 transition-transform ${
                loading ? "animate-spin" : ""
              }`}
            />
            {loading ? "Refreshing..." : "Refresh Data"}
          </Button>
        </div>

        {/* ✅ KPI Cards */}
        <KPICards metrics={metrics} />

        {/* 📊 Charts */}
        <div className="grid gap-8 lg:grid-cols-2">
          <VisibilityTrendChart />
          <EngineBreakdownChart />
        </div>

        {/* 🔍 Keyword Table */}
        <KeywordTable />

        {/* 💡 Recommendations */}
        <RecommendationsPanel />
      </main>
    </div>
  );
}
