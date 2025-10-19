import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Gauge, Layers, Globe, TrendingUp } from "lucide-react";

const kpiData = [
  {
    title: "Visibility Score",
    value: "72%",
    change: "+12%",
    trend: "up",
    icon: Gauge,
    description: "this week",
  },
  {
    title: "Avg Position",
    value: "2.4",
    change: "-0.3",
    trend: "up",
    icon: BarChart3,
    description: "improved",
  },
  {
    title: "Avg Citations",
    value: "2.1",
    change: "+0.4",
    trend: "up",
    icon: Layers,
    description: "per result",
  },
  {
    title: "Engines Tracked",
    value: "4",
    change: "Active",
    trend: "neutral",
    icon: Globe,
    description: "platforms",
  },
];

export const KPICards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi) => (
        <Card key={kpi.title} className="transition-all hover:shadow-soft-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.title}
            </CardTitle>
            <kpi.icon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{kpi.value}</div>
            <div className="mt-1 flex items-center gap-2 text-xs">
              {kpi.trend === "up" && (
                <div className="flex items-center gap-1 text-success">
                  <TrendingUp className="h-3 w-3" />
                  <span className="font-medium">{kpi.change}</span>
                </div>
              )}
              {kpi.trend === "neutral" && (
                <span className="font-medium text-muted-foreground">{kpi.change}</span>
              )}
              <span className="text-muted-foreground">{kpi.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
