"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Gauge, Layers, Globe, TrendingUp, TrendingDown, Activity } from "lucide-react";

const kpiData = [
  {
    title: "Visibility Score",
    value: "72%",
    change: "+12%",
    trend: "up",
    icon: Gauge,
    description: "this week",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100",
    progress: 72,
  },
  {
    title: "Avg Position",
    value: "2.4",
    change: "-0.3",
    trend: "up",
    icon: BarChart3,
    description: "improved",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    iconBg: "bg-green-100",
    progress: 76, // Inverse of position (lower is better)
  },
  {
    title: "Avg Citations",
    value: "2.1",
    change: "+0.4",
    trend: "up",
    icon: Layers,
    description: "per result",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconBg: "bg-purple-100",
    progress: 70,
  },
  {
    title: "Engines Tracked",
    value: "4",
    change: "Active",
    trend: "neutral",
    icon: Globe,
    description: "platforms",
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50",
    iconBg: "bg-amber-100",
    progress: 100,
  },
];

export const KPICards = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi) => (
        <Card 
          key={kpi.title} 
          className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border-0 ${kpi.bgColor}`}
          onMouseEnter={() => setHoveredCard(kpi.title)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Background gradient decoration */}
          <div className={`absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 bg-gradient-to-br ${kpi.color} -mr-12 -mt-12`}></div>
          
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              {kpi.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${kpi.iconBg} transition-transform duration-300 ${hoveredCard === kpi.title ? 'scale-110' : ''}`}>
              <kpi.icon className={`h-4 w-4 bg-gradient-to-br ${kpi.color} bg-clip-text text-transparent`} />
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="text-3xl font-bold text-gray-800 mb-3">{kpi.value}</div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${kpi.color} transition-all duration-1000 ease-out`}
                style={{ width: `${kpi.progress}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                {kpi.trend === "up" && (
                  <div className="flex items-center gap-1 text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    <TrendingUp className="h-3 w-3" />
                    <span className="font-medium">{kpi.change}</span>
                  </div>
                )}
                {kpi.trend === "down" && (
                  <div className="flex items-center gap-1 text-red-600 bg-red-100 px-2 py-1 rounded-full">
                    <TrendingDown className="h-3 w-3" />
                    <span className="font-medium">{kpi.change}</span>
                  </div>
                )}
                {kpi.trend === "neutral" && (
                  <span className="font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">{kpi.change}</span>
                )}
              </div>
              <span className="text-xs text-gray-500">{kpi.description}</span>
            </div>
            
            {/* Mini sparkline for trend visualization */}
            {hoveredCard === kpi.title && (
              <div className="mt-3 h-10 flex items-end justify-between gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-full bg-gradient-to-t ${kpi.color} rounded-t opacity-60`}
                    style={{ height: `${Math.random() * 100}%` }}
                  ></div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};