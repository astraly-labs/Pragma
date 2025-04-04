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
import { AssetInfo } from "@/app/(dashboard)/assets/_types";
import { SUPPORTED_SOURCES } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { startStreaming } from "../_helpers/startStreaming";

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

  // Track if real data has been received to prevent switching to mock data if real data arrives later
  const hasReceivedRealDataRef = useRef<boolean>(false);

  const [streamingData, setStreamingData] = useState<{ [ticker: string]: any }>(
    {}
  );

  const handleSourceChange = (newSource: string) => {
    router.push(
      `/asset/${asset.ticker.replace("/", "-")}?network=${newSource}`
    );
  };

  // Function to add a data point to the chart
  const addDataPoint = (timestamp: number, price: number) => {
    if (!chartRef.current || !chartRef.current.lineSeries) {
      console.warn("Chart reference not available");
      return;
    }

    try {
      if (isNaN(timestamp) || isNaN(price)) {
        console.warn("Invalid data point values:", { timestamp, price });
        return;
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

      chartRef.current.lineSeries.update(newPoint);

      if (dataRef.current.length > 1) {
        chartRef.current.chart.timeScale().fitContent();
      }

      console.log("Updated chartData", dataRef.current);
    } catch (err) {
      console.error("Error adding data point to chart:", err);
    }
  };

  // Initialize chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Clean up previous chart if it exists
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

    // Reset data if switching assets
    dataRef.current = [];

    // Add initial point to ensure chart renders
    const now = Math.floor(Date.now() / 1000);
    const initialValue =
      lastValueRef.current !== null ? lastValueRef.current : 100;

    const initialPoint = {
      time: (now - 10) as UTCTimestamp,
      value: initialValue,
    };

    dataRef.current.push(initialPoint);
    lineSeries.setData([initialPoint]);

    // Handle resize
    const handleResize = () => {
      if (!chartContainerRef.current) return;
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: 350,
      });
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(chartContainerRef.current);

    // Store references
    chartRef.current = {
      chart,
      lineSeries,
      resizeObserver,
      remove() {
        resizeObserver.disconnect();
        chart.remove();
      },
    };

    // Reset streaming state
    hasReceivedRealDataRef.current = false;

    return () => {
      if (chartRef.current) {
        chartRef.current.resizeObserver.disconnect();
        chartRef.current.chart.remove();
        chartRef.current = null;
      }
    };
  }, [asset?.ticker, streamingData]);

  // Process streaming data
  useEffect(() => {
    const data = streamingData[asset.ticker];
    if (!chartRef.current || !data) {
      return;
    }

    // If we're missing critical data or the data is marked as loading, skip processing
    if (!data.price || data.loading === true) {
      return;
    }

    try {
      // This indicates we've received actual data from the streaming API
      hasReceivedRealDataRef.current = true;

      // Get timestamp, defaulting to now if not available
      const timestamp = data.last_updated_timestamp
        ? Math.floor(data.last_updated_timestamp)
        : Math.floor(Date.now() / 1000);

      // Parse price with different formats in mind
      let priceNumber;

      if (typeof data.price === "string" && data.price.startsWith("0x")) {
        // Handle hex format
        priceNumber =
          parseInt(data.price, 16) /
          10 ** (data.decimals || asset.decimals || 18);
      } else if (!isNaN(parseFloat(data.price))) {
        // Handle numeric or string numeric format
        priceNumber =
          parseFloat(data.price) /
          10 ** (data.decimals || asset.decimals || 18);
      } else {
        console.warn("Unrecognized price format:", data.price);
        return;
      }

      // Add valid data point to chart
      if (!isNaN(timestamp) && !isNaN(priceNumber)) {
        addDataPoint(timestamp, priceNumber);
      }
    } catch (err) {
      console.error("Error processing streaming data:", err);
    }
  }, [streamingData, asset.ticker, asset.decimals]);

  // Start data streaming
  useEffect(() => {
    let mounted = true;
    let retryCount = 0;
    const maxRetries = 3;
    const retryDelay = 5000;

    // Initial loading state
    setStreamingData((prev) => ({
      ...prev,
      [asset.ticker]: {
        price: lastValueRef.current
          ? (lastValueRef.current * 10 ** (asset.decimals || 18)).toString(16)
          : "0x0",
        decimals: asset.decimals || 18,
        last_updated_timestamp: Math.floor(Date.now() / 1000),
        nb_sources_aggregated: 0,
        variations: { "1h": 0, "1d": 0, "1w": 0 },
        loading: true,
      },
    }));

    // Function to generate mock data
    const startMockDataGeneration = () => {
      // Clear any existing interval
      if (mockIntervalRef.current) {
        clearInterval(mockIntervalRef.current);
      }

      // Skip mock data if we've already received real data
      if (hasReceivedRealDataRef.current) {
        return;
      }

      // Initialize with a base price if we don't have one
      if (lastValueRef.current === null) {
        lastValueRef.current = 100 + Math.random() * 10;
      }

      // Generate data points every 3 seconds
      mockIntervalRef.current = setInterval(() => {
        if (!mounted) return;

        // Skip if we received real data in the meantime
        if (hasReceivedRealDataRef.current) {
          if (mockIntervalRef.current) {
            clearInterval(mockIntervalRef.current);
            mockIntervalRef.current = null;
          }
          return;
        }

        const now = Math.floor(Date.now() / 1000);

        // Generate a value that trends slightly from the last value
        const direction = Math.random() > 0.5 ? 1 : -1;
        const change = Math.random() * 2; // Max 2% change per tick
        const basePrice = lastValueRef.current || 100;
        const newPrice = basePrice * (1 + (direction * change) / 100);

        // Update the state with the new mock data
        setStreamingData((prev) => ({
          ...prev,
          [asset.ticker]: {
            price:
              "0x" +
              Math.floor(newPrice * 10 ** (asset.decimals || 18)).toString(16),
            decimals: asset.decimals || 18,
            last_updated_timestamp: now,
            nb_sources_aggregated: 1,
            variations: {
              "1h": Math.random() * 2 - 1,
              "1d": Math.random() * 4 - 2,
              "1w": Math.random() * 8 - 4,
            },
            loading: false,
            isMockData: true,
          },
        }));
      }, 3000);
    };

    // Function to attempt streaming with retries
    const startStreamWithRetry = async () => {
      try {
        await startStreaming(asset.ticker, (data) => {
          if (!mounted) return;

          hasReceivedRealDataRef.current = true;

          // Clear mock data if it was running
          if (mockIntervalRef.current) {
            clearInterval(mockIntervalRef.current);
            mockIntervalRef.current = null;
          }

          setStreamingData((prev) => ({
            ...prev,
            [asset.ticker]: {
              ...data,
              loading: false,
            },
          }));
        });
      } catch (error: any) {
        console.warn(
          `Streaming attempt ${retryCount + 1} failed:`,
          error.message
        );

        if (mounted && retryCount < maxRetries) {
          retryCount++;
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          return startStreamWithRetry();
        } else {
          console.error(
            "All streaming retry attempts failed, using mock data instead"
          );
          if (mounted && !hasReceivedRealDataRef.current) {
            startMockDataGeneration();
          }
        }
      }
    };

    // Start streaming
    startStreamWithRetry();

    // Start mock data after a short delay if real data hasn't arrived
    const mockDataDelayTimer = setTimeout(() => {
      if (mounted && !hasReceivedRealDataRef.current) {
        startMockDataGeneration();
      }
    }, 5000);

    // Cleanup
    return () => {
      mounted = false;
      clearTimeout(mockDataDelayTimer);

      if (mockIntervalRef.current) {
        clearInterval(mockIntervalRef.current);
        mockIntervalRef.current = null;
      }
    };
  }, [asset.ticker, asset.decimals, currentSource]);

  if (asset?.error || asset?.isUnsupported) return null;

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
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3" />
                          )}
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
