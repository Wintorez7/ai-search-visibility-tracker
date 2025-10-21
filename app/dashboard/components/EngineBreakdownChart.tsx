"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface EngineData {
  engine: string;
  visibility: number;
  color: string;
}

export const EngineBreakdownChart = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState<EngineData[]>([]);

  // 🎯 Fetch engine-level visibility dynamically
  useEffect(() => {
    setIsMounted(true);

    async function fetchEngineData() {
      try {
        const res = await fetch("/api/engine-breakdown");
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching engine breakdown:", error);
      }
    }

    fetchEngineData();
  }, []);

  if (!isMounted) {
    return (
      <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-100">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">
            Engine Breakdown
          </CardTitle>
          <p className="text-sm text-gray-500">Loading chart...</p>
        </CardHeader>
        <CardContent className="h-[350px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-500">Initializing...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800 mb-1">{label}</p>
          <p className="text-sm text-gray-600">
            Visibility:{" "}
            <span className="font-bold text-blue-600">
              {payload[0].value}%
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-100">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-800">
          Engine Breakdown
        </CardTitle>
        <p className="text-sm text-gray-500">
          Visibility across AI platforms
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              barSize={70}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e0e7ff"
                vertical={false}
                strokeOpacity={0.5}
              />

              <XAxis
                dataKey="engine"
                tick={{ fill: "#475569", fontSize: 13, fontWeight: 500 }}
                axisLine={{ stroke: "#cbd5e1" }}
                tickLine={false}
              />

              <YAxis
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                tick={{ fill: "#475569", fontSize: 12 }}
                axisLine={{ stroke: "#cbd5e1" }}
                tickLine={false}
                tickFormatter={(value) => `${value}%`}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
              />

              <Bar
                dataKey="visibility"
                radius={[12, 12, 0, 0]}
                animationDuration={1500}
                animationBegin={0}
              >
                {data.map((item) => (
                  <Cell
                    key={item.engine}
                    fill={item.color}
                    stroke={item.color}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-6 flex justify-center gap-6 flex-wrap">
          {data.map((item) => (
            <div key={item.engine} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-sm shadow-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium text-gray-700">
                {item.engine}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
