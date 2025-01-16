import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { date: "2024-04-01", package: 222, users: 150 },
  { date: "2024-04-02", package: 97, users: 180 },
  { date: "2024-04-03", package: 167, users: 120 },
  { date: "2024-04-04", package: 242, users: 260 },
  { date: "2024-04-05", package: 373, users: 290 },
  { date: "2024-04-06", package: 301, users: 340 },
  { date: "2024-04-07", package: 245, users: 180 },
  { date: "2024-04-08", package: 409, users: 320 },
  { date: "2024-04-09", package: 59, users: 110 },
  { date: "2024-04-10", package: 261, users: 190 },
  { date: "2024-04-11", package: 327, users: 350 },
  { date: "2024-04-12", package: 292, users: 210 },
  { date: "2024-04-13", package: 342, users: 380 },
  { date: "2024-04-14", package: 137, users: 220 },
  { date: "2024-04-15", package: 120, users: 170 },
  { date: "2024-04-16", package: 138, users: 190 },
  { date: "2024-04-17", package: 446, users: 360 },
  { date: "2024-04-18", package: 364, users: 410 },
  { date: "2024-04-19", package: 243, users: 180 },
  { date: "2024-04-20", package: 89, users: 150 },
  { date: "2024-04-21", package: 137, users: 200 },
  { date: "2024-04-22", package: 224, users: 170 },
  { date: "2024-04-23", package: 138, users: 230 },
  { date: "2024-04-24", package: 387, users: 290 },
  { date: "2024-04-25", package: 215, users: 250 },
  { date: "2024-04-26", package: 75, users: 130 },
  { date: "2024-04-27", package: 383, users: 420 },
  { date: "2024-04-28", package: 122, users: 180 },
  { date: "2024-04-29", package: 315, users: 240 },
  { date: "2024-04-30", package: 454, users: 380 },
  { date: "2024-05-01", package: 165, users: 220 },
  { date: "2024-05-02", package: 293, users: 310 },
  { date: "2024-05-03", package: 247, users: 190 },
  { date: "2024-05-04", package: 385, users: 420 },
  { date: "2024-05-05", package: 481, users: 390 },
  { date: "2024-05-06", package: 498, users: 520 },
  { date: "2024-05-07", package: 388, users: 300 },
  { date: "2024-05-08", package: 149, users: 210 },
  { date: "2024-05-09", package: 227, users: 180 },
  { date: "2024-05-10", package: 293, users: 330 },
  { date: "2024-05-11", package: 335, users: 270 },
  { date: "2024-05-12", package: 197, users: 240 },
  { date: "2024-05-13", package: 197, users: 160 },
  { date: "2024-05-14", package: 448, users: 490 },
  { date: "2024-05-15", package: 473, users: 380 },
  { date: "2024-05-16", package: 338, users: 400 },
  { date: "2024-05-17", package: 499, users: 420 },
  { date: "2024-05-18", package: 315, users: 350 },
  { date: "2024-05-19", package: 235, users: 180 },
  { date: "2024-05-20", package: 177, users: 230 },
  { date: "2024-05-21", package: 82, users: 140 },
  { date: "2024-05-22", package: 81, users: 120 },
  { date: "2024-05-23", package: 252, users: 290 },
  { date: "2024-05-24", package: 294, users: 220 },
  { date: "2024-05-25", package: 201, users: 250 },
  { date: "2024-05-26", package: 213, users: 170 },
  { date: "2024-05-27", package: 420, users: 460 },
  { date: "2024-05-28", package: 233, users: 190 },
  { date: "2024-05-29", package: 78, users: 130 },
  { date: "2024-05-30", package: 340, users: 280 },
  { date: "2024-05-31", package: 178, users: 230 },
  { date: "2024-06-01", package: 178, users: 200 },
  { date: "2024-06-02", package: 470, users: 410 },
  { date: "2024-06-03", package: 103, users: 160 },
  { date: "2024-06-04", package: 439, users: 380 },
  { date: "2024-06-05", package: 88, users: 140 },
  { date: "2024-06-06", package: 294, users: 250 },
  { date: "2024-06-07", package: 323, users: 370 },
  { date: "2024-06-08", package: 385, users: 320 },
  { date: "2024-06-09", package: 438, users: 480 },
  { date: "2024-06-10", package: 155, users: 200 },
  { date: "2024-06-11", package: 92, users: 150 },
  { date: "2024-06-12", package: 492, users: 420 },
  { date: "2024-06-13", package: 81, users: 130 },
  { date: "2024-06-14", package: 426, users: 380 },
  { date: "2024-06-15", package: 307, users: 350 },
  { date: "2024-06-16", package: 371, users: 310 },
  { date: "2024-06-17", package: 475, users: 520 },
  { date: "2024-06-18", package: 107, users: 170 },
  { date: "2024-06-19", package: 341, users: 290 },
  { date: "2024-06-20", package: 408, users: 450 },
  { date: "2024-06-21", package: 169, users: 210 },
  { date: "2024-06-22", package: 317, users: 270 },
  { date: "2024-06-23", package: 480, users: 530 },
  { date: "2024-06-24", package: 132, users: 180 },
  { date: "2024-06-25", package: 141, users: 190 },
  { date: "2024-06-26", package: 434, users: 380 },
  { date: "2024-06-27", package: 448, users: 490 },
  { date: "2024-06-28", package: 149, users: 200 },
  { date: "2024-06-29", package: 103, users: 160 },
  { date: "2024-06-30", package: 446, users: 400 },
];

const chartConfig = {
  views: {
    label: "Page Views",
  },
  package: {
    label: "package",
    color: "hsl(var(--chart-1))",
  },
  users: {
    label: "users",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function DailyReport() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("package");

  const total = React.useMemo(
    () => ({
      package: chartData.reduce((acc, curr) => acc + curr.package, 0),
      users: chartData.reduce((acc, curr) => acc + curr.users, 0),
    }),
    []
  );

  return (
    <Card className="  bg-white">
      <CardHeader className=" flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["package", "users"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
