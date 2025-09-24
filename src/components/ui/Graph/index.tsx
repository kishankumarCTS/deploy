"use client";

import {
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";

type GraphProps = {
  title?: string;
  subtitle?: string;
  data: { [key: string]: any }[];
  xKey: string;
  yKey: string;
  className?: string;
  height?: number;
  showHeader?: boolean;
  gradientColor?: string;
  strokeDasharray?: string;
  headerAction?: React.ReactNode; 
};

export default function Graph({
  title,
  subtitle,
  data,
  xKey,
  yKey,
  className = "",
  height = 400,
  showHeader = true,
  gradientColor = "#3B82F6", 
  strokeDasharray = "3 3",
  headerAction,
}: GraphProps) {
  return (
    <div
      className={`rounded-xl border border-blue-300 p-4 shadow-sm bg-white w-full mx-auto ${className}`}
    >
      {showHeader && (
        <div className="flex justify-between items-center mb-2">
          <div>
            {title && <h2 className="headline-large font-medium">{title}</h2>}
            {subtitle && (
              <p className="text-sm text-gray-500">{subtitle}</p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorGraph" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={gradientColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={gradientColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Area
            type="linear"
            dataKey={yKey}
            stroke={gradientColor}
            fillOpacity={1}
            fill="url(#colorGraph)"
            strokeDasharray={strokeDasharray}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
