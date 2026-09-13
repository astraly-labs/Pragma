"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { scaleIn } from "@/lib/animations";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { AssetInfo } from "@/app/(dashboard)/assets/_types";
import { SUPPORTED_SOURCES } from "@/lib/constants";
import { startPriceStream, PriceStreamData } from "@/lib/price-stream";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type AssetChartProps = {
  asset: AssetInfo;
  currentSource: string;
};

export const AssetChart = ({ asset, currentSource }: AssetChartProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [chartData, setChartData] = useState<
    Array<{ date: string; value: number }>
  >([]);

  const handleSourceChange = (newSource: string) => {
    router.push(
      `/asset/${asset.ticker.replace("/", "-")}?network=${newSource}`
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let snapshot: PriceStreamData = {};
    return startPriceStream([asset.ticker], (update) => {
      snapshot = typeof update === "function" ? update(snapshot) : update;
      const quote = snapshot[asset.ticker];
      if (!quote || !("price" in quote)) return;
      const price = Number(quote.price) / 10 ** quote.decimals;
      if (!Number.isFinite(price)) return;
      const date = new Date(quote.last_updated_timestamp * 1000).toISOString();
      setChartData((previous) => {
        if (previous.length && previous[previous.length - 1].date >= date)
          return previous;
        return [...previous, { date, value: price }].slice(-100);
      });
    });
  }, [asset.ticker, currentSource]);

  if (asset?.error || asset?.isUnsupported) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={scaleIn}
      className="w-full flex-col justify-between gap-8 md:flex-row md:gap-5"
    >
      <div className="flex flex-col gap-3 pb-4 sm:flex-row sm:gap-10">
        <div ref={dropdownRef} className="relative md:w-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex w-full cursor-pointer flex-row justify-center rounded-full border border-lightBlur px-6 py-3 text-center text-sm text-lightGreen focus:outline-hidden sm:w-fit"
          >
            <span className="block truncate">{currentSource}</span>
            <Image
              className="my-auto pl-2"
              height={16}
              width={16}
              alt="arrowDown"
              src="/assets/vectors/arrowDown.svg"
            />
          </button>
          {isOpen && (
            <div className="absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-green py-1 text-sm text-lightGreen ring-1 backdrop-blur-sm focus:outline-hidden">
              {SUPPORTED_SOURCES.map((option, idx) => (
                <button
                  key={idx}
                  className={`relative w-full cursor-pointer select-none py-2 pl-10 pr-4 text-left text-lightGreen hover:opacity-50`}
                  onClick={() => {
                    handleSourceChange(option);
                    setIsOpen(false);
                  }}
                >
                  <span
                    className={`block truncate ${
                      option === currentSource ? "font-medium" : "font-normal"
                    }`}
                  >
                    {option}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Card className="w-full rounded-none border border-lightBlur bg-darkGreen p-2 text-white">
        <CardContent className="pt-4 sm:pt-6">
          <ChartContainer
            config={
              {
                price: {
                  label: "Price",
                  color: "#ff7946",
                },
              } satisfies ChartConfig
            }
            className="aspect-auto h-[300px] w-full"
          >
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 50, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff7946" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#ff7946" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#444"
              />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tick={{ fill: "#fff" }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                }}
              />

              <YAxis
                domain={([min, max]) => {
                  if (min === max) {
                    const offset = min === 0 ? 1 : Math.max(min * 0.001, 0.01);
                    return [min - offset, max + offset];
                  }

                  const range = max - min;
                  const padding = range * 0.1; // 10% padding

                  return [min - padding, max + padding];
                }}
                tick={{ fill: "#fff" }}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(val) =>
                  val < 1
                    ? val.toFixed(8)
                    : val < 100
                      ? val.toFixed(5)
                      : val.toFixed(2)
                }
              />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(val) => new Date(val).toLocaleTimeString()}
                    indicator="dot"
                  />
                }
              />

              <Area
                type="natural"
                dataKey="value"
                stroke="#ff7946"
                fill="url(#fillPrice)"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};
