"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Dot,
  ReferenceLine,
  TooltipProps,
} from "recharts";
// Import types and constants
import {
  DataPoint,
  TooltipData,
  CustomDotProps,
  ChartMouseEvent,
} from "./types";
import {
  CHART_DATA,
  QUICK_ACTIONS,
  METRIC_CARDS,
  DEFAULT_ACTIVE_POINT,
  CHART_CONFIG,
  COLORS,
  INSTANCE_OPTIONS,
} from "./constants";

export default function OverviewPanel() {
  const [activePoint, setActivePoint] = useState<string>(DEFAULT_ACTIVE_POINT);
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedInstance, setSelectedInstance] = useState(INSTANCE_OPTIONS[0]);

  useEffect(() => {
    const defaultData = CHART_DATA.find((d) => d.date === DEFAULT_ACTIVE_POINT);
    if (defaultData) {
      setTooltipData({
        date: defaultData.fullDate,
        value: defaultData.value,
        lastPeriod: defaultData.lastPeriod,
      });
    }
  }, []);

  const handleMouseMove = (e: ChartMouseEvent | null) => {
    if (e && e.activeLabel) {
      setActivePoint(e.activeLabel);
      if (e.activePayload && e.activePayload.length > 0) {
        const payload = e.activePayload[0].payload;
        setTooltipData({
          date: payload.fullDate,
          value: payload.value,
          lastPeriod: payload.lastPeriod,
        });
      }
    }
  };

  const handleInstanceSelect = (instance: (typeof INSTANCE_OPTIONS)[0]) => {
    setSelectedInstance(instance);
    setIsDropdownOpen(false);
  };

  // const CustomTooltip = ({
  //   active,
  //   payload,
  // }: {
  //   active?: boolean;
  //   payload?: Array<{ payload: DataPoint }>;
  // }) => {
  //   if (active && payload && payload.length) {
  //     const current = payload[0].payload as DataPoint;
  //     return (
  //       <div className="bg-slate-700 text-white p-3 rounded-lg shadow-lg border-0">
  //         <p className="text-xs text-gray-300 mb-1">{current.fullDate}</p>
  //         <p className="text-[14.77px] font-medium mb-2 leading-[25.32px]">
  //           $ {current.value}
  //         </p>
  //         <div className="flex items-center gap-1 mb-1">
  //           <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
  //           <span className="text-xs text-gray-300">Last Period</span>
  //         </div>
  //         <p className="text-sm font-normal">$ {current.lastPeriod}</p>
  //       </div>
  //     );
  //   }
  //   return null;
  // };

  // const CustomMainDot = ({ cx, cy, payload }: CustomDotProps) => {
  //   if (typeof cx !== "number" || typeof cy !== "number" || !payload) {
  //     return null;
  //   }

  //   const isActive = payload.date === activePoint;
  //   if (isActive) {
  //     return (
  //       <Dot
  //         cx={cx}
  //         cy={cy}
  //         r={5}
  //         fill={COLORS.primary}
  //         stroke={COLORS.white}
  //         strokeWidth={2}
  //       />
  //     );
  //   }
  //   return <Dot cx={cx} cy={cy} r={3} fill={COLORS.primary} />;
  // };

  // const CustomGreyDot = ({ cx, cy, payload }: CustomDotProps) => {
  //   if (typeof cx !== "number" || typeof cy !== "number" || !payload) {
  //     return null;
  //   }

  //   const isActive = payload.date === activePoint;
  //   if (isActive) {
  //     return (
  //       <Dot
  //         cx={cx}
  //         cy={cy}
  //         r={4}
  //         fill={COLORS.secondary}
  //         stroke={COLORS.white}
  //         strokeWidth={2}
  //       />
  //     );
  //   }
  //   return <Dot cx={cx} cy={cy} r={3} fill={COLORS.secondary} />;
  // };

  return (
    <div className="flex gap-6">
      <div className="flex-[7] flex flex-col gap-6">
        <div className="flex gap-4">
          <div className="bg-white p-5 rounded-2xl shadow flex items-center justify-between w-1/2">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                <Image
                  src="/images/overview/server-icon.svg"
                  alt="Instances"
                  width={32}
                  height={32}
                />
              </div>
              <div>
                <p className="text-blue-500 text-sm font-medium">Instances</p>
                <h3 className="text-2xl font-bold text-blue-600">10</h3>
              </div>
            </div>
            <button className="w-12 h-12 rounded-xl bg-blue-600 text-white text-xl font-bold flex items-center justify-center">
              +
            </button>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow w-1/2 flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
              <Image
                src="/images/overview/projects-icon.svg"
                alt="Projects"
                width={32}
                height={32}
              />
            </div>
            <div>
              <p className="text-blue-500 text-sm font-medium">
                Active Projects
              </p>
              <h3 className="text-2xl font-bold text-blue-600">6/10</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-base font-semibold mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((action, i) => (
              <button
                key={i}
                className="flex items-center justify-between h-[64px] px-3 rounded-lg border border-[#BFD9FF]"
                style={{ backgroundColor: "#DBEAFE" }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Image
                    src={action.icon}
                    alt={action.title}
                    width={36}
                    height={36}
                  />
                  <div className="flex flex-col items-start truncate">
                    <span className="text-[#1D4ED8] font-medium text-[13px] leading-[18px] truncate">
                      {action.title}
                    </span>
                    <span className="text-[#0F172A]/80 text-[12px] leading-[16px]">
                      {action.count}
                    </span>
                  </div>
                </div>
                <Image
                  src="/images/overview/arrow-right.svg"
                  alt="arrow"
                  width={30}
                  height={20}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-[5]">
        <div
          className="p-6 rounded-2xl shadow h-full flex flex-col text-white"
          style={{
            background:
              "linear-gradient(218.08deg, #93C5FD -1.54%, #1D4ED8 89.24%)",
          }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Monitoring</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 bg-white rounded-lg px-3 py-1 text-sm text-black hover:bg-gray-50 transition-colors"
                >
                  <Image
                    src="/images/overview/settings.svg"
                    alt="Settings"
                    width={16}
                    height={16}
                  />
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: selectedInstance.color }}
                    ></div>
                    <span className="max-w-[120px] truncate">
                      {selectedInstance.name}
                    </span>
                  </div>
                  <Image
                    src="/images/overview/arrow-down.svg"
                    alt="▼"
                    width={12}
                    height={12}
                    className={`transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
                    <div className="py-1">
                      {INSTANCE_OPTIONS.map((instance, index) => (
                        <button
                          key={index}
                          onClick={() => handleInstanceSelect(instance)}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                        >
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: instance.color }}
                          ></div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {instance.name}
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                              {instance.status} • {instance.region}
                            </div>
                          </div>
                          {selectedInstance.name === instance.name && (
                            <div className="w-4 h-4 text-blue-600">✓</div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Image
                src="/images/overview/expand.svg"
                alt="Expand"
                width={24}
                height={24}
              />
            </div>
          </div>
          <div className="flex gap-3 mb-4">
            {METRIC_CARDS.map((item, i) => (
              <div
                key={i}
                className="flex-1 bg-white rounded-xl p-3 text-center text-gray-800"
              >
                <p className="text-[11px] text-gray-500 whitespace-nowrap truncate">
                  {item.label}
                </p>
                <h4 className="text-base font-semibold">{item.value}</h4>
              </div>
            ))}
          </div>
          {/* <div className="bg-white rounded-xl p-4 relative">
            <LineChart
              data={CHART_DATA}
              width={CHART_CONFIG.width}
              height={CHART_CONFIG.height}
              onMouseMove={handleMouseMove}
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
          </div> */}
          <div className="mt-4 bg-white rounded-xl overflow-hidden">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className={`
                  flex justify-between items-center px-4 py-3 text-gray-700 hover:bg-gray-50
                  ${i !== 0 ? "border-t border-gray-200" : ""}
                `}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/overview/doc-icon.svg"
                    alt="doc"
                    width={20}
                    height={20}
                  />
                  <span>Sample Text</span>
                </div>
                <Image
                  src="/images/overview/righticon.svg"
                  alt="arrow"
                  width={12}
                  height={16}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
