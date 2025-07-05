'use client'

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import { mockTransactions } from "@/lib/data"
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import { useMemo } from "react"

export default function CategoryChart() {
  const expenseData = useMemo(() => {
    const categories = mockTransactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => {
        if (!acc[t.category]) {
          acc[t.category] = 0;
        }
        acc[t.category] += t.amount;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(categories).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, []);

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
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <Tooltip
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
          </PieChart>
        </ChartContainer>
      </CardContent>
       <CardFooter className="flex-col gap-2 text-sm mt-4">
        <ChartLegend
          content={<ChartLegendContent nameKey="name" />}
        />
      </CardFooter>
    </Card>
  )
}
