"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Dot,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-lg border border-neutral-200 bg-white px-4 py-3 shadow-lg">
      <p className="font-medium text-neutral-900">{label}</p>

      <p className="mt-1 text-sm text-neutral-500">
        Learning Hours
      </p>

      <p className="mt-2 text-lg font-bold text-blue-600">
        {payload[0].value} hrs
      </p>
    </div>
  );
}

function CustomDot({ cx, cy }) {
  return (
    <Dot
      cx={cx}
      cy={cy}
      r={4}
      fill="#2563eb"
      stroke="#ffffff"
      strokeWidth={2}
    />
  );
}

export default function WeeklyActivityChart({
  data,
  mode = "full",
}) {
  const isPreview = mode === "preview";

  return (
    <div
      className={
        isPreview
          ? "h-[180px] w-full"
          : "h-[320px] w-full"
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 12,
            right: 12,
            left: isPreview ? -25 : -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient
              id="weeklyGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#2563eb"
                stopOpacity={0.18}
              />
              <stop
                offset="100%"
                stopColor="#2563eb"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            stroke="#f1f5f9"
          />

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#737373",
              fontSize: isPreview ? 10 : 13,
            }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#737373",
              fontSize: isPreview ? 10 : 13,
            }}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#2563eb",
              strokeDasharray: "4 4",
            }}
          />

          <Area
            type="monotone"
            dataKey="hours"
            fill="url(#weeklyGradient)"
            stroke="none"
          />

          <Line
            type="monotone"
            dataKey="hours"
            stroke="#2563eb"
            strokeWidth={isPreview ? 2 : 3}
            dot={<CustomDot />}
            activeDot={{
              r: isPreview ? 5 : 7,
            }}
            animationDuration={900}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}