"use client";

import { EngineBreakdownChart } from "./components/EngineBreakdownChart";
import { Header } from "./components/Header";
import { KeywordTable } from "./components/KeywordTable";
import { KPICards } from "./components/KPICards";
import { RecommendationsPanel } from "./components/RecommendationsPanel";
import { VisibilityTrendChart } from "./components/VisibilityTrendChart";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-soft dark:bg-gray-950">
      {/* ✅ Top header (logo, welcome, actions, etc.) */}
      <Header />

      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* 🚀 KPI Summary Cards */}
          <KPICards />

          {/* 📊 Charts Row */}
          <div className="grid gap-8 lg:grid-cols-2">
            <VisibilityTrendChart />
            <EngineBreakdownChart />
          </div>

          {/* 🔍 Keyword Table */}
          <KeywordTable />

          {/* 💡 AI Recommendations */}
          <RecommendationsPanel />
        </div>
      </main>
    </div>
  );
}
