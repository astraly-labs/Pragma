"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { AssetInfo } from "@/app/(dashboard)/assets/_types";
import { SUPPORTED_SOURCES } from "@/lib/constants";
import { startStreaming } from "@/app/(dashboard)/asset/[ticker]/_helpers/startStreaming";
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
  const [streamingData, setStreamingData] = useState<{ [ticker: string]: any }>(
    {}
  );
  const [chartData, setChartData] = useState<
    Array<{ date: string; value: number }>
  >([]);
  const latestData = streamingData[asset.ticker];

  const handleSourceChange = (newSource: string) => {
    router.push(
      `/asset/${asset.ticker.replace("/", "-")}?network=${newSource}`
    );
  };

  useEffect(() => {
    startStreaming(asset.ticker, setStreamingData);
  }, [asset.ticker, currentSource]);

  useEffect(() => {
    if (!latestData || latestData.loading) return;

    const timestamp =
      latestData.last_updated_timestamp ?? Math.floor(Date.now() / 1000);

    let priceNumber = 0;
    if (
      typeof latestData.price === "string" &&
      latestData.price.startsWith("0x")
    ) {
      priceNumber =
        parseInt(latestData.price, 16) /
        10 ** (latestData.decimals || asset.decimals || 18);
    } else if (!isNaN(parseFloat(latestData.price))) {
      priceNumber =
        parseFloat(latestData.price) /
        10 ** (latestData.decimals || asset.decimals || 18);
    } else {
      return;
    }

    const value = parseFloat(
      priceNumber < 1
        ? priceNumber.toFixed(8)
        : priceNumber < 100
        ? priceNumber.toFixed(5)
        : priceNumber.toFixed(2)
    );

    const now = Date.now();
    const nowISO = new Date(now).toISOString();
    const oneSecondEarlier = new Date(now - 1000).toISOString();

    setChartData((prev) => {
      let updated = [...prev];

      if (updated.length < 2) {
        updated.push({ date: oneSecondEarlier, value });
      }

      updated.push({ date: nowISO, value });

      if (updated.length > 100) {
        updated = updated.slice(-100);
      }

      return updated;
    });
  }, [latestData, asset.decimals]);

  if (asset?.error || asset?.isUnsupported) return null;

  return (
    <div className="w-full flex-col justify-between gap-8 md:flex-row md:gap-5">
      <div className="flex flex-col gap-3 pb-4 sm:flex-row sm:gap-10">
        <Listbox value={currentSource} onChange={handleSourceChange}>
          <div className="relative md:w-auto">
            <ListboxButton className="relative flex w-full cursor-pointer flex-row justify-center rounded-full border border-lightBlur px-6 py-3 text-center text-sm text-lightGreen focus:outline-none sm:w-fit">
              <span className="block truncate">{currentSource}</span>
              <Image
                className="my-auto pl-2"
                height={16}
                width={16}
                alt="arrowDown"
                src="/assets/vectors/arrowDown.svg"
              />
            </ListboxButton>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-green py-1 text-sm text-lightGreen ring-1 backdrop-blur focus:outline-none">
                {SUPPORTED_SOURCES.map((option, idx) => (
                  <ListboxOption
                    key={idx}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 text-lightGreen ${
                        active ? "opacity-50" : ""
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option}
                      </span>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </Listbox>
      </div>

      <Card className="w-full border border-lightBlur bg-darkGreen p-2 text-white">
        <CardContent className="pt-4 sm:pt-6">
          <ChartContainer
            config={
              {
                price: {
                  label: "Price",
                  color: "#00ff9d",
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
                  <stop offset="5%" stopColor="#00ff9d" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#00ff9d" stopOpacity={0.05} />
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
                stroke="#00ff9d"
                fill="url(#fillPrice)"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
