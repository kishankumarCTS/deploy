import {
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "01:20:00", value: 5000 },
  { time: "01:20:00", value: 9000 },
  { time: "01:20:00", value: 30000 },
  { time: "01:20:00", value: 50000 },
  { time: "01:20:00", value: 10000 },
  { time: "01:20:00", value: 15000 },
  { time: "01:20:00", value: 50000 },
  { time: "01:20:00", value: 100000 },
];

export default function CpuUsageChart() {
  return (
    <div className="rounded-xl border border-blue-300 p-4 shadow-sm bg-white w-full mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h2 className="headline-large font-medium">CPU Usage</h2>
        <button className="text-sm text-gray-500 border px-2 py-1 rounded">
          Today
        </button>
      </div>
      <ResponsiveContainer width="100%" min-height={400} height={651}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Area
            type="linear"
            dataKey="value"
            stroke="#3B82F6"
            fillOpacity={1}
            fill="url(#colorCpu)"
            strokeDasharray="3 3"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
