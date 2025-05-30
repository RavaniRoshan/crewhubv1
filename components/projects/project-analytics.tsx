"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ProjectAnalyticsProps {
  projectId: string;
}

// Mock data for project analytics
const usageData = [
  { date: "2025-05-01", tokens: 28500, cost: 0.57, conversations: 12 },
  { date: "2025-05-02", tokens: 32000, cost: 0.64, conversations: 15 },
  { date: "2025-05-03", tokens: 18000, cost: 0.36, conversations: 8 },
  { date: "2025-05-04", tokens: 25000, cost: 0.50, conversations: 10 },
  { date: "2025-05-05", tokens: 42000, cost: 0.84, conversations: 18 },
  { date: "2025-05-06", tokens: 36000, cost: 0.72, conversations: 16 },
  { date: "2025-05-07", tokens: 31000, cost: 0.62, conversations: 14 },
  { date: "2025-05-08", tokens: 28000, cost: 0.56, conversations: 12 },
  { date: "2025-05-09", tokens: 33500, cost: 0.67, conversations: 15 },
  { date: "2025-05-10", tokens: 29000, cost: 0.58, conversations: 13 },
  { date: "2025-05-11", tokens: 24500, cost: 0.49, conversations: 11 },
  { date: "2025-05-12", tokens: 37500, cost: 0.75, conversations: 17 },
  { date: "2025-05-13", tokens: 40000, cost: 0.80, conversations: 19 },
  { date: "2025-05-14", tokens: 32500, cost: 0.65, conversations: 14 },
];

const modelUsageData = [
  { model: "GPT-4", value: 65, fill: "hsl(var(--chart-1))" },
  { model: "Claude-3-Opus", value: 20, fill: "hsl(var(--chart-2))" },
  { model: "Claude-3-Sonnet", value: 10, fill: "hsl(var(--chart-3))" },
  { model: "GPT-3.5-Turbo", value: 5, fill: "hsl(var(--chart-4))" },
];

const tokenDistributionData = [
  { name: "User Messages", tokens: 125000, fill: "hsl(var(--chart-1))" },
  { name: "AI Responses", tokens: 250000, fill: "hsl(var(--chart-2))" },
  { name: "System Prompts", tokens: 50000, fill: "hsl(var(--chart-3))" },
  { name: "Function Calls", tokens: 25000, fill: "hsl(var(--chart-4))" },
];

export function ProjectAnalytics({ projectId }: ProjectAnalyticsProps) {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Usage Overview</CardTitle>
          <CardDescription>Token usage and cost over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={usageData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "tokens") return [value.toLocaleString(), "Tokens"];
                    if (name === "cost") return [`$${value}`, "Cost"];
                    return [value, name];
                  }}
                  labelFormatter={(label) => {
                    return new Date(label).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    });
                  }}
                />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="tokens"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1)/0.2)"
                  name="Tokens"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="cost"
                  stroke="hsl(var(--chart-2))"
                  fill="hsl(var(--chart-2)/0.2)"
                  name="Cost ($)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Model Usage</CardTitle>
            <CardDescription>Distribution of usage by AI model</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={modelUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="model"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {modelUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Usage"]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Token Distribution</CardTitle>
            <CardDescription>
              Breakdown of token usage by message type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={tokenDistributionData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis type="number" />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={120}
                  />
                  <Tooltip
                    formatter={(value) => [value.toLocaleString(), "Tokens"]}
                  />
                  <Legend />
                  <Bar
                    dataKey="tokens"
                    nameKey="name"
                    label={{
                      position: "right",
                      formatter: (value) => value.toLocaleString(),
                    }}
                  >
                    {tokenDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}