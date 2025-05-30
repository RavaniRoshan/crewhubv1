"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface UsageStatsProps {
  className?: string;
}

const dailyData = [
  { name: "Mon", tokens: 2500, cost: 0.05 },
  { name: "Tue", tokens: 3000, cost: 0.06 },
  { name: "Wed", tokens: 4500, cost: 0.09 },
  { name: "Thu", tokens: 2800, cost: 0.056 },
  { name: "Fri", tokens: 3200, cost: 0.064 },
  { name: "Sat", tokens: 1500, cost: 0.03 },
  { name: "Sun", tokens: 1800, cost: 0.036 },
];

const weeklyData = [
  { name: "Week 1", tokens: 18000, cost: 0.36 },
  { name: "Week 2", tokens: 22000, cost: 0.44 },
  { name: "Week 3", tokens: 19500, cost: 0.39 },
  { name: "Week 4", tokens: 24000, cost: 0.48 },
];

const monthlyData = [
  { name: "Jan", tokens: 85000, cost: 1.7 },
  { name: "Feb", tokens: 78000, cost: 1.56 },
  { name: "Mar", tokens: 92000, cost: 1.84 },
  { name: "Apr", tokens: 104000, cost: 2.08 },
  { name: "May", tokens: 88000, cost: 1.76 },
  { name: "Jun", tokens: 95000, cost: 1.9 },
];

export function UsageStats({ className }: UsageStatsProps) {
  const [activeTab, setActiveTab] = useState("daily");
  
  // Select the data based on the active tab
  const data = {
    daily: dailyData,
    weekly: weeklyData,
    monthly: monthlyData,
  }[activeTab];

  return (
    <Card className={cn("col-span-4", className)}>
      <CardHeader>
        <CardTitle>Usage Statistics</CardTitle>
        <CardDescription>
          Token usage and associated costs over time
        </CardDescription>
        <Tabs
          defaultValue="daily"
          className="mt-2"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="px-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                tickLine={false} 
              />
              <YAxis 
                yAxisId="left"
                tick={{ fontSize: 12 }} 
                tickLine={false}
                tickFormatter={(value) => `${value.toLocaleString()}`}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12 }} 
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === "tokens") return [value.toLocaleString(), "Tokens"];
                  if (name === "cost") return [`$${value}`, "Cost"];
                  return [value, name];
                }}
              />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="tokens"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1)/0.2)"
                activeDot={{ r: 8 }}
                name="Tokens"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="cost"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2)/0.2)"
                name="Cost"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}