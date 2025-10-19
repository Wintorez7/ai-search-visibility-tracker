"use client";

import { FC } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ✅ Define TypeScript types for chart data
interface VisibilityData {
  day: string;
  visibility: number;
}

// ✅ Sample data
const data: VisibilityData[] = [
  { day: "Mon", visibility: 65 },
  { day: "Tue", visibility: 68 },
  { day: "Wed", visibility: 70 },
  { day: "Thu", visibility: 69 },
  { day: "Fri", visibility: 72 },
  { day: "Sat", visibility: 71 },
  { day: "Sun", visibility: 72 },
];

// ✅ Typed functional component
export const VisibilityTrendChart: FC = () => {
  return (
    <Card className="shadow-sm border border-border/50">
      <CardHeader>
        <CardTitle>Visibility Trend</CardTitle>
        <p className="text-sm text-muted-foreground">
          Last 7 days performance
        </p>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
            />
            <XAxis
              dataKey="day"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value: number) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              formatter={(value: number) => [`${value}%`, "Visibility"]}
            />
            <Line
              type="monotone"
              dataKey="visibility"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
