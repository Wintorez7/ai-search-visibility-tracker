"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const KPICards = ({ metrics }: { metrics: any }) => {
  if (!metrics) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading metrics...
      </div>
    );
  }

  const cards = [
    { title: "Visibility Score", value: `${metrics.visibilityScore.toFixed(1)}%` },
    { title: "Avg Position", value: metrics.avgPosition.toFixed(2) },
    { title: "Avg Citations", value: metrics.avgCitations.toFixed(2) },
    { title: "Engines Tracked", value: metrics.enginesTracked },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <Card key={c.title} className="bg-white/70 backdrop-blur-sm border border-gray-100">
          <CardHeader>
            <CardTitle className="text-gray-700 text-sm">{c.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-gray-900">
            {c.value}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
