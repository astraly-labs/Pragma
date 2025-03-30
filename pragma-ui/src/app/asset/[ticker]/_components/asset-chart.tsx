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
import moment from "moment-timezone";
import { AssetInfo } from "@/app/assets/_types";
import { SUPPORTED_SOURCES, TIME_ZONE } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useEventSourceQuery } from "../_helpers/useEventSourceQuery";
import { PriceData } from "../_types";

type AssetChartProps = {
  asset: AssetInfo;
  currentSource: string;
};

export const AssetChart = ({ asset, currentSource }: AssetChartProps) => {
  const router = useRouter();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const [historical, setHistorical] = useState<PriceData[]>([]);

  useEventSourceQuery({
    queryKey: "ASSET",
    eventName: "historical",
    url: `${
      process.env.NEXT_PUBLIC_INTERNAL_API
    }/data/multi/stream?pairs=${asset.ticker.toLowerCase()}&interval=100ms&aggregation=median&historical_prices=10`,
    setHistorical,
    historical,
  });

  if (asset?.error || asset?.isUnsupported) {
    return null;
  }

  const handleSourceChange = (newSource: string) => {
    router.push(
      `/asset/${asset.ticker.replace("/", "-")}?network=${newSource}`
    );
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
        background: {
          type: ColorType.Solid,
          color: "transparent",
        },
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
        mode: 0, // Crosshair mode
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
        fixLeftEdge: true,
        fixRightEdge: true,
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
        autoScale: false,
        scaleMargins: {
          top: 0.1,
          bottom: 0.3,
        },
      },
    });

    const lineSeries = chart.addLineSeries({
      color: "#00ff9d",
      lineWidth: 2,
      crosshairMarkerVisible: true,
      lastValueVisible: true,
      priceFormat: {
        type: "price",
        precision: 3,
        minMove: 0.001,
      },
    });

    const handleResize = () => {
      if (!chartContainerRef.current) return;

      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: 350,
      });
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }

    chartRef.current = {
      chart,
      lineSeries,
      resizeObserver,
      remove() {
        resizeObserver.disconnect();
        chart.remove();
      },
    };

    if (historical && asset.decimals) {
      const historicalData = historical
        .map((point) => ({
          time: (moment.tz(point.timestamp, TIME_ZONE).valueOf() /
            1000) as UTCTimestamp,
          value: Number(
            (parseInt(point.price, 16) / 10 ** Number(asset.decimals)).toFixed(
              3
            )
          ),
        }))
        .filter((p: any) => !isNaN(p.value));

      if (historicalData.length > 0) {
        lineSeries.setData(historicalData);
        chart.timeScale().fitContent();
      }
    }

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
    };
  }, [asset?.ticker]);

  useEffect(() => {
    if (!chartRef.current || !asset?.price || !asset.decimals) return;

    const { lineSeries } = chartRef.current;

    const newPoint = {
      time: moment.tz(asset.lastUpdated, TIME_ZONE).valueOf() / 1000,
      value: Number(
        (parseInt(String(asset.price), 16) / 10 ** asset.decimals).toFixed(3)
      ),
    };

    if (!isNaN(newPoint.value)) {
      lineSeries.update(newPoint);
    }
  }, [asset?.ticker]);

  return (
    <div className="w-full flex-col justify-between gap-8 md:flex-row md:gap-5">
      {currentSource !== "api" && (
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
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {option}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3" />
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      )}

      <div
        ref={chartContainerRef}
        className="min-h-[400px] w-full rounded-xl border border-lightBlur bg-darkGreen p-8 overflow-hidden"
      />
    </div>
  );
};
