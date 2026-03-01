"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface RLAgentChartProps {
  userRewards: number[];
  aiRewards: number[];           // AI agent (Gemini/deterministic)
}

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border rounded-xl shadow-lg px-4 py-3 text-sm">
      <p className="font-semibold text-muted-foreground mb-2">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 mb-1">
          <span className="w-3 h-3 rounded-full inline-block flex-shrink-0" style={{ background: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-bold">{p.value.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}

export default function RLAgentChart({
  userRewards,
  aiRewards,
}: RLAgentChartProps) {
  const chartData = useMemo(() => {
    const len = Math.max(userRewards.length, aiRewards.length, 1);
    return Array.from({ length: len }, (_, i) => ({
      name: `S${i + 1}`,
      You: userRewards[i] ?? userRewards[userRewards.length - 1] ?? 0,
      "AI Agent": aiRewards[i] ?? aiRewards[aiRewards.length - 1] ?? 0,
    }));
  }, [userRewards, aiRewards]);

  return (
    <ResponsiveContainer width="100%" height={340}>
      <LineChart data={chartData} margin={{ top: 8, right: 24, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          tickLine={false}
          axisLine={{ stroke: "hsl(var(--border))" }}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          tickLine={false}
          axisLine={{ stroke: "hsl(var(--border))" }}
          label={{
            value: "Cumulative Reward",
            angle: -90,
            position: "insideLeft",
            offset: 12,
            style: { fontSize: 11, fill: "hsl(var(--muted-foreground))" },
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
          iconType="circle"
          iconSize={10}
        />
        <ReferenceLine y={0} stroke="hsl(var(--border))" strokeDasharray="3 3" />

        {/* You (blue) */}
        <Line
          type="monotone"
          dataKey="You"
          stroke="#2563eb"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5, strokeWidth: 0 }}
        />

        {/* AI Agent (green dashed) */}
        <Line
          type="monotone"
          dataKey="AI Agent"
          stroke="#16a34a"
          strokeWidth={2}
          strokeDasharray="6 3"
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
