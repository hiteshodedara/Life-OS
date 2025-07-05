'use client'

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import type { Transaction } from "@/lib/types"
import { PieChart, Pie, Cell } from 'recharts'
import { useMemo } from "react"

type CategoryChartProps = {
  transactions: Transaction[];
}

export default function CategoryChart({ transactions }: CategoryChartProps) {
  const expenseData = useMemo(() => {
    const categories = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => {
        if (!acc[t.category]) {
          acc[t.category] = 0;
        }
        acc[t.category] += t.amount;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(categories).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [transactions]);

  const chartConfig = useMemo(() => {
    const config: ChartConfig = {};
    expenseData.forEach((item, index) => {
        config[item.name] = {
            label: item.name,
            color: `hsl(var(--chart-${(index % 5) + 1}))`
        }
    });
    return config;
  }, [expenseData]);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>A breakdown of your expenses this month.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
      {expenseData.length > 0 ? (
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={expenseData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                {expenseData.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={chartConfig[entry.name]?.color} className="stroke-background" />
                ))}
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="name" className="flex-wrap" />}
              />
            </PieChart>
          </ChartContainer>
      ) : (
        <div className="flex h-[300px] w-full items-center justify-center text-muted-foreground">
            No expense data to display.
        </div>
      )}
      </CardContent>
    </Card>
  )
}
