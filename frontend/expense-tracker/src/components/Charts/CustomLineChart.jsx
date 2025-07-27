// src/components/CustomLineChart.jsx

import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";



const CustomLineChart = ({ data }) => {
  // Define a custom component for the tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-gray-300 bg-white p-2 shadow-md">
          <p className="mb-1 text-xs font-semibold text-teal-800">
            {payload[0].payload.category}
          </p>
          <p className="text-sm text-gray-600">
            Amount:
            <span className="test-sm font-medium text-gray-900">{` $${payload[0].payload.amount}`}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          {/* Define the gradient for the area fill */}
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#009688" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#009688" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Chart Axes and Grid */}
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />

          {/* Chart Tooltip */}
          <Tooltip content={<CustomTooltip />} />

          {/* Chart Area */}
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#009688"
            fill="url(#incomeGradient)"
            strokeWidth={3}
            dot={{ r: 3, fill: "3ab8df8" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
