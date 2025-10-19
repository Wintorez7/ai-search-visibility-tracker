"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const EngineBreakdownChart = () => {
  const data = [
    { name: 'ChatGPT', value: 80 },
    { name: 'Gemini', value: 40 },
    { name: 'Claude', value: 60 },
    { name: 'Perplexity', value: 72 },
  ];

  const colors = ['#2563eb', '#a855f7', '#0891b2', '#d946ef'];

  return (
    <div className="w-full bg-white p-8 rounded-lg border border-gray-200">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Engine Breakdown</h2>
        <p className="text-sm text-gray-500 mt-1">Visibility across AI platforms</p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: '#6b7280', fontSize: 13 }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80]}
            tick={{ fill: '#6b7280', fontSize: 13 }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
            label={{ value: '%', angle: -90, position: 'insideLeft', offset: 10, fill: '#6b7280' }}
          />
          <Tooltip
            formatter={(value) => `${value}%`}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
            cursor={{ fill: 'rgba(0,0,0,0.05)' }}
          />
          {data.map((entry, index) => (
            <Bar
              key={`bar-${index}`}
              dataKey="value"
              fill={colors[index]}
              radius={[4, 4, 0, 0]}
              data={[entry]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 flex gap-6 justify-center text-xs text-gray-500 flex-wrap">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: colors[index] }}></div>
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};