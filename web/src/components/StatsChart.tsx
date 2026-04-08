"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsData, MuscleFrequency } from "@/types/workout";

interface CardioChartProps {
  data: StatsData[];
  title?: string;
}

export function CardioChart({ data, title = "有氧运动时长趋势" }: CardioChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="label" 
                tick={{ fontSize: 12 }}
                tickMargin={8}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value}分钟`}
              />
              <Tooltip 
                formatter={(value) => [`${value} 分钟`, "有氧时长"]}
                contentStyle={{ 
                  borderRadius: "8px", 
                  border: "none", 
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)" 
                }}
              />
              <Line
                type="monotone"
                dataKey="cardio"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

interface MuscleChartProps {
  data: MuscleFrequency[];
  title?: string;
}

export function MuscleChart({ data, title = "肌肉群训练频率" }: MuscleChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data} 
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
              <XAxis 
                type="number" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                dataKey="muscle" 
                type="category" 
                tick={{ fontSize: 12 }}
                width={50}
              />
              <Tooltip 
                formatter={(value) => [`${value} 次`, "训练次数"]}
                contentStyle={{ 
                  borderRadius: "8px", 
                  border: "none", 
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)" 
                }}
              />
              <Bar 
                dataKey="count" 
                fill="hsl(var(--primary))"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
