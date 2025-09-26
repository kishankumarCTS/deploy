import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Dot,
  ReferenceLine,
} from "recharts";
import {
  DataPoint,
  CustomDotProps,
  ChartMouseEvent,
} from "./types";
import {
  CHART_CONFIG,
  COLORS,
} from "./constants";

interface ChartComponentProps {
  data: DataPoint[];
  activePoint: string;
  onMouseMove: (e: ChartMouseEvent | null) => void;
  CustomTooltip: React.ComponentType<any>;
}

export default function ChartComponent({ 
  data, 
  activePoint, 
  onMouseMove, 
  CustomTooltip 
}: ChartComponentProps) {
  const CustomMainDot = ({ cx, cy, payload }: CustomDotProps) => {
    if (typeof cx !== "number" || typeof cy !== "number" || !payload) {
      return null;
    }

    const isActive = payload.date === activePoint;
    if (isActive) {
      return (
        <Dot
          cx={cx}
          cy={cy}
          r={5}
          fill={COLORS.primary}
          stroke={COLORS.white}
          strokeWidth={2}
        />
      );
    }
    return <Dot cx={cx} cy={cy} r={3} fill={COLORS.primary} />;
  };

  const CustomGreyDot = ({ cx, cy, payload }: CustomDotProps) => {
    if (typeof cx !== "number" || typeof cy !== "number" || !payload) {
      return null;
    }

    const isActive = payload.date === activePoint;
    if (isActive) {
      return (
        <Dot
          cx={cx}
          cy={cy}
          r={4}
          fill={COLORS.secondary}
          stroke={COLORS.white}
          strokeWidth={2}
        />
      );
    }
    return <Dot cx={cx} cy={cy} r={3} fill={COLORS.secondary} />;
  };

  return (
    <LineChart
      data={data}
      width={CHART_CONFIG.width}
      height={CHART_CONFIG.height}
      onMouseMove={onMouseMove}
    >
      <XAxis
        dataKey="date"
        tick={{ fontSize: 11, fill: COLORS.gray[500] }}
        axisLine={false}
        tickLine={false}
      />
      <YAxis
        tick={{ fontSize: 10, fill: COLORS.gray[500] }}
        domain={CHART_CONFIG.yAxisDomain}
        axisLine={false}
        tickLine={false}
      />
      <Tooltip content={<CustomTooltip />} />

      <ReferenceLine
        x={activePoint}
        stroke="#94A3B8"
        strokeDasharray="4 4"
        strokeWidth={1}
      />

      <Line
        type="linear"
        dataKey="value"
        stroke={CHART_CONFIG.mainLineColor}
        strokeWidth={CHART_CONFIG.mainLineStrokeWidth}
        dot={<CustomMainDot />}
        activeDot={{
          r: 6,
          fill: CHART_CONFIG.mainLineColor,
          stroke: COLORS.white,
          strokeWidth: 2,
        }}
      />
      <Line
        type="linear"
        dataKey="compare"
        stroke={CHART_CONFIG.compareLineColor}
        strokeWidth={CHART_CONFIG.compareLineStrokeWidth}
        dot={<CustomGreyDot />}
      />
    </LineChart>
  );
}