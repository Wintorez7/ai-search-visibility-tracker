"use client";

import { FC, useState, useEffect } from "react";
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
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts";

// Define TypeScript types for chart data
interface VisibilityData {
  day: string;
  visibility: number;
  date?: string;
}

// Sample data with additional details
const data: VisibilityData[] = [
  { day: "Mon", visibility: 65, date: "2023-10-01" },
  { day: "Tue", visibility: 68, date: "2023-10-02" },
  { day: "Wed", visibility: 70, date: "2023-10-03" },
  { day: "Thu", visibility: 69, date: "2023-10-04" },
  { day: "Fri", visibility: 72, date: "2023-10-05" },
  { day: "Sat", visibility: 71, date: "2023-10-06" },
  { day: "Sun", visibility: 75, date: "2023-10-07" },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-800 mb-1">{label}</p>
        <p className="text-sm text-gray-600">
          Visibility: <span className="font-bold text-blue-600">{payload[0].value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

// Typed functional component
export const VisibilityTrendChart: FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    setAnimationKey(prev => prev + 1);
  }, []);

  if (!isMounted) {
    return (
      <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-100">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">Visibility Trend</CardTitle>
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

  // Calculate average visibility
  const avgVisibility = Math.round(
    data.reduce((sum, item) => sum + item.visibility, 0) / data.length
  );

  // Find max and min values
  const maxVisibility = Math.max(...data.map(item => item.visibility));
  const minVisibility = Math.min(...data.map(item => item.visibility));

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-100">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-800">Visibility Trend</CardTitle>
        <p className="text-sm text-gray-500">Last 7 days performance</p>
      </CardHeader>

      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={data} 
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              key={animationKey}
            >
              <defs>
                <linearGradient id="colorVisibility" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#e0e7ff" 
                vertical={false} 
                strokeOpacity={0.5}
              />
              
              <XAxis
                dataKey="day"
                tick={{ fill: '#475569', fontSize: 13, fontWeight: 500 }}
                axisLine={{ stroke: '#cbd5e1' }}
                tickLine={false}
              />
              
              <YAxis
                domain={[60, 80]}
                ticks={[60, 65, 70, 75, 80]}
                tick={{ fill: '#475569', fontSize: 12 }}
                axisLine={{ stroke: '#cbd5e1' }}
                tickLine={false}
                tickFormatter={(value: number) => `${value}%`}
              />
              
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
              
              {/* Average line */}
              <ReferenceLine 
                y={avgVisibility} 
                stroke="#94a3b8" 
                strokeDasharray="5 5" 
                label={{ value: `Avg: ${avgVisibility}%`, position: "right" }}
              />
              
              <Area
                type="monotone"
                dataKey="visibility"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#colorVisibility)"
                animationDuration={1500}
                animationBegin={0}
              />
              
              <Line
                type="monotone"
                dataKey="visibility"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 5, strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 7, stroke: "#fff", strokeWidth: 2 }}
                animationDuration={1500}
                animationBegin={0}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Stats Cards */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-white/50">
            <span className="text-xs text-gray-500 mb-1">Average</span>
            <span className="text-lg font-bold text-blue-600">{avgVisibility}%</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-white/50">
            <span className="text-xs text-gray-500 mb-1">Highest</span>
            <span className="text-lg font-bold text-green-600">{maxVisibility}%</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-white/50">
            <span className="text-xs text-gray-500 mb-1">Lowest</span>
            <span className="text-lg font-bold text-red-600">{minVisibility}%</span>
          </div>
        </div>
        
        {/* Day-by-day breakdown */}
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Daily Breakdown</h3>
          <div className="flex justify-between items-center">
            {data.map((item, index) => (
              <div key={item.day} className="flex flex-col items-center">
                <span className="text-xs text-gray-500 mb-1">{item.day}</span>
                <div className="relative">
                  <div 
                    className="w-2 h-8 rounded-full" 
                    style={{ 
                      backgroundColor: "#3b82f6",
                      height: `${(item.visibility - 60) * 4}px`,
                      animationDelay: `${index * 100}ms`
                    }}
                  ></div>
                  <span className="text-xs font-medium text-gray-700 mt-1">{item.visibility}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};