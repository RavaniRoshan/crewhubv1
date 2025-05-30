"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface UsageStatsProps {
  data: {
    daily: Array<{ date: string; tokens: number; cost: number }>;
    weekly: Array<{ date: string; tokens: number; cost: number }>;
    monthly: Array<{ date: string; tokens: number; cost: number }>;
  };
}

export function UsageStats({ data }: UsageStatsProps) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Usage Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily">
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          {Object.entries(data).map(([period, values]) => (
            <TabsContent key={period} value={period}>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={values}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        name === "tokens"
                          ? value.toLocaleString()
                          : `$${value.toFixed(2)}`,
                        name === "tokens" ? "Tokens" : "Cost",
                      ]}
                    />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="tokens"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary)/0.2)"
                      name="Tokens"
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="cost"
                      stroke="hsl(var(--destructive))"
                      fill="hsl(var(--destructive)/0.2)"
                      name="Cost"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          ))}
        </CardContent>
      </CardContent>
    </Card>
  );
}