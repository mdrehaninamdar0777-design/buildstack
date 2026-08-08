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
    <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-xl">
      <p className="text-sm font-semibold text-neutral-900">
        {label}
      </p>

      <p className="mt-1 text-sm text-neutral-500">
        Learning Hours
      </p>

      <p className="mt-2 text-lg font-bold text-blue-600">
        {payload[0].value} hrs
      </p>
    </div>
  );
}

function CustomDot({ cx, cy, stroke }) {
  return (
    <Dot
      cx={cx}
      cy={cy}
      r={5}
      fill={stroke}
      stroke="#ffffff"
      strokeWidth={3}
    />
  );
}

export default function WeeklyActivityChart({ data }) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 12,
            right: 12,
            left: -20,
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
                stopOpacity={0.25}
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
              fontSize: 13,
            }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#737373",
              fontSize: 13,
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
            strokeWidth={3}
            dot={<CustomDot />}
            activeDot={{
              r: 7,
            }}
            animationDuration={900}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}