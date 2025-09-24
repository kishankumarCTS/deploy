"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { time: "00:00", value: 1 },
  { time: "01:00", value: 3 },
  { time: "02:00", value: 2 },
  { time: "03:00", value: 3 },
  { time: "04:00", value: 3 },
  { time: "05:00", value: 5 },
];

export default function ChartCard({ title }: { title: string }) {
  return (
    <div className="rounded-xl border border-blue-300 bg-white p-4 shadow-sm w-full">
      <div className="text-sm font-medium text-gray-700 mb-1">{title}</div>

      <div className="text-xs text-gray-500 mb-2">12 Sep 09:00</div>
      <div className="flex items-baseline gap-2 mb-2">
        <div className="text-xl font-bold text-gray-800">24%</div>
        <div className="text-sm text-green-500">+3.4%</div>
      </div>

      <ResponsiveContainer width="100%" height={100}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSmall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" hide />
          <YAxis hide domain={[0, 6]} />
          <Tooltip />
          <Area
            type="linear"
            dataKey="value"
            stroke="#3B82F6"
            fill="url(#colorSmall)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
