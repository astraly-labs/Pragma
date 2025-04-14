"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Listbox, Transition } from "@headlessui/react";
import {
  createChart,
  ColorType,
  LineStyle,
  PriceScaleMode,
  UTCTimestamp,
} from "lightweight-charts";
import { useRouter } from "next/navigation";
import { AssetInfo } from "@/app/(dashboard)/assets/_types";
import { SUPPORTED_SOURCES } from "@/lib/constants";
import { startStreaming } from "@/app/(dashboard)/asset/[ticker]/_helpers/startStreaming";

type AssetChartProps = {
  asset: AssetInfo;
  currentSource: string;
};

export const AssetChart = ({ asset, currentSource }: AssetChartProps) => {
  const router = useRouter();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const dataRef = useRef<Array<{ time: UTCTimestamp; value: number }>>([]);
  const mockIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastValueRef = useRef<number | null>(null);
  const hasReceivedRealDataRef = useRef<boolean>(false);

  const [streamingData, setStreamingData] = useState<{ [ticker: string]: any }>(
    {}
  );

  const latestData = streamingData[asset.ticker];

  const handleSourceChange = (newSource: string) => {
    router.push(
      `/asset/${asset.ticker.replace("/", "-")}?network=${newSource}`
    );
  };

  const addDataPoint = (timestamp: number, price: number) => {
    if (!chartRef.current || !chartRef.current.lineSeries) return;

    if (
      dataRef.current.length > 0 &&
      dataRef.current[dataRef.current.length - 1].time >= timestamp
    ) {
      timestamp = dataRef.current[dataRef.current.length - 1].time + 1;
    }

    const newPoint = {
      time: timestamp as UTCTimestamp,
      value: Number(price.toFixed(3)),
    };

    lastValueRef.current = newPoint.value;
    dataRef.current.push(newPoint);

    if (dataRef.current.length > 100) {
      dataRef.current = dataRef.current.slice(-100);
    }

    chartRef.current.lineSeries.setData(dataRef.current);
    chartRef.current.chart.timeScale().fitContent();
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 350,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#c4f8e2",
        fontFamily: "Inter, sans-serif",
      },
      grid: {
        vertLines: {
          color: "rgba(197, 203, 206, 0.3)",
          style: LineStyle.Solid,
        },
        horzLines: {
          color: "rgba(197, 203, 206, 0.3)",
          style: LineStyle.Solid,
        },
      },
      crosshair: {
        mode: 0,
        vertLine: {
          color: "#c4f8e2",
          width: 1,
          style: LineStyle.Dashed,
          visible: true,
          labelVisible: true,
        },
        horzLine: {
          color: "#c4f8e2",
          width: 1,
          style: LineStyle.Dashed,
          visible: true,
          labelVisible: true,
        },
      },
      timeScale: {
        rightOffset: 5,
        barSpacing: 6,
        lockVisibleTimeRangeOnResize: true,
        rightBarStaysOnScroll: true,
        borderVisible: false,
        visible: true,
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderVisible: false,
        mode: PriceScaleMode.Normal,
        autoScale: true,
        scaleMargins: { top: 0.1, bottom: 0.3 },
      },
    });

    const lineSeries = chart.addLineSeries({
      color: "#00ff9d",
      lineWidth: 2,
      crosshairMarkerVisible: true,
      lastValueVisible: true,
      priceFormat: { type: "price", precision: 3, minMove: 0.001 },
    });

    dataRef.current = [];

    const now = Math.floor(Date.now() / 1000);
    const initialValue = lastValueRef.current ?? 100;
    const initialPoint = {
      time: (now - 10) as UTCTimestamp,
      value: initialValue,
    };

    dataRef.current.push(initialPoint);
    lineSeries.setData([initialPoint]);

    const handleResize = () => {
      if (!chartContainerRef.current) return;
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: 350,
      });
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(chartContainerRef.current);

    chartRef.current = {
      chart,
      lineSeries,
      resizeObserver,
      remove() {
        resizeObserver.disconnect();
        chart.remove();
      },
    };

    hasReceivedRealDataRef.current = false;

    return () => {
      if (chartRef.current) {
        chartRef.current.resizeObserver.disconnect();
        chartRef.current.chart.remove();
        chartRef.current = null;
      }
    };
  }, [asset?.ticker]);

  useEffect(() => {
    if (!chartRef.current || !latestData || latestData.loading) return;

    hasReceivedRealDataRef.current = true;

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
      console.warn("Invalid price format:", latestData.price);
      return;
    }

    addDataPoint(timestamp, priceNumber);
  }, [latestData, asset.decimals]);

  useEffect(() => {
    startStreaming(asset.ticker, setStreamingData);
  }, [asset.ticker, asset.decimals, currentSource]);

  if (asset?.error || asset?.isUnsupported) return null;

  return (
    <div className="w-full flex-col justify-between gap-8 md:flex-row md:gap-5">
      <div className="flex flex-col gap-3 pb-4 sm:flex-row sm:gap-10">
        <Listbox value={currentSource} onChange={handleSourceChange}>
          <div className="relative md:w-auto">
            <Listbox.Button className="relative flex w-full cursor-pointer flex-row justify-center rounded-full border border-lightBlur px-6 py-3 text-center text-sm text-lightGreen focus:outline-none sm:w-fit">
              <span className="block truncate">{currentSource}</span>
              <Image
                className="my-auto pl-2"
                height={16}
                width={16}
                alt="arrowDown"
                src="/assets/vectors/arrowDown.svg"
              />
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-green py-1 text-sm text-lightGreen ring-1 backdrop-blur focus:outline-none">
                {SUPPORTED_SOURCES.map((option, idx) => (
                  <Listbox.Option
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
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      <div
        ref={chartContainerRef}
        className="min-h-[400px] w-full rounded-xl border border-lightBlur bg-darkGreen p-8 overflow-hidden"
      />
    </div>
  );
};
