import React, { Fragment, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Listbox, Transition } from "@headlessui/react";
import { UTCTimestamp, createChart } from "lightweight-charts";
import { useData } from "../../providers/data";
import { Asset } from "../../pages/asset/[ticker]";
import moment from "moment";
import { removeDuplicateTimestamps, timezone } from "../../pages";

// If you have these from somewhere else, adapt accordingly
import { options } from "../../pages/assets";

interface PricePoint {
  time: UTCTimestamp;
  value: number;
}

const AssetChart = ({ asset }: { asset: Asset }) => {
  const { currentSource, switchSource, data } = useData();
  const [selectedFrame] = useState("15min");
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<{
    chart: ReturnType<typeof createChart>;
    lineSeries: ReturnType<ReturnType<typeof createChart>["addLineSeries"]>;
  } | null>(null);
  const [chartType, setChartType] = useState<"candlestick" | "line">("line");
  const [timeframe, setTimeframe] = useState<"1m" | "1h" | "1d" | "1w">("1h");
  const [showHistorical, setShowHistorical] = useState(false);
  
  // Skip chart creation if asset has an error
  if (asset?.error || asset?.isUnsupported) {
    return null;
  }

  //
  // 1) Create the chart only once on mount
  //
  useEffect(() => {
    if (!chartContainerRef.current || chartRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 350,
      layout: {
        background: { color: "#00000000" },
        textColor: "#c4f8e2",
        fontFamily: "Inter, sans-serif",
      },
      grid: {
        vertLines: { color: "rgba(197, 203, 206, 0.3)" },
        horzLines: { color: "rgba(197, 203, 206, 0.3)" },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: "#c4f8e2",
          width: 1,
          style: 3,
          visible: true,
          labelVisible: true,
        },
        horzLine: {
          color: "#c4f8e2",
          width: 1,
          style: 3,
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
        tickMarkFormatter: (time: number) => {
          return moment(time * 1000).format("HH:mm:ss");
        },
      },
      rightPriceScale: {
        borderVisible: false,
        visible: true,
        scaleMargins: { 
          top: 0.1, 
          bottom: 0.3 
        },
        autoScale: false,
        mode: 1,
        alignLabels: true,
        borderColor: "rgba(197, 203, 206, 0.3)",
        ticksVisible: true,
        entireTextOnly: true,
      },
      handleScale: {
        mouseWheel: true,
        pinch: true,
        axisPressedMouseMove: true,
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: true,
      },
    });

    const lineSeries = chart.addLineSeries({
      color: "#00ff9d",
      lineWidth: 2,
      crosshairMarkerVisible: true,
      lastValueVisible: true,
      priceLineVisible: true,
      baseLineVisible: false,
      autoscaleInfoProvider: () => ({
        priceRange: {
          minMove: 0.001,
          defaultPriceScale: {
            autoScale: false,
            invertScale: false,
            alignLabels: true,
          },
        },
      }),
      priceFormat: {
        type: "price",
        precision: 3,
        minMove: 0.001,
      },
    });

    // Store references
    chartRef.current = { chart, lineSeries };

    // Resize logic
    const handleResize = () => {
      if (!chartRef.current || !chartContainerRef.current) return;
      const { clientWidth } = chartContainerRef.current;
      chartRef.current.chart.applyOptions({
        width: clientWidth,
        height: 350,
      });
      
      // Ensure the chart maintains its view on resize
      chartRef.current.chart.timeScale().scrollToPosition(0, false);
    };

    // Initial sizing
    handleResize();

    // Observe container size changes
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(chartContainerRef.current);

    // Cleanup on unmount
    return () => {
      resizeObserver.disconnect();
      if (chartRef.current) {
        chartRef.current.chart.remove();
      }
      chartRef.current = null;
    };
  }, []);

  //
  // 2) Handle WebSocket data for non-API sources
  //
  useEffect(() => {
    if (!asset || currentSource === "api") return;

    let wsInstance: WebSocket | null = new WebSocket(
      "wss://ws.devnet.pragma.build/node/v1/onchain/ohlc/subscribe"
    );

    wsInstance.onopen = () => {
      console.log("WebSocket connected");
      if (wsInstance) {
        wsInstance.send(
          JSON.stringify({
            msg_type: "subscribe",
            pair: asset.ticker,
            network: currentSource,
            interval: selectedFrame,
            candles_to_get: 1000,
          })
        );
      }
    };

    wsInstance.onmessage = (event) => {
      const wsData = JSON.parse(event.data);
      if (wsData.msg_type === "subscribe") return;

      let updatedPriceData: PricePoint[] = [];
      if (Array.isArray(wsData) && wsData.length > 0) {
        if (wsData.length === 1) {
          const newData = wsData[0];
          const time = (moment.tz(newData.time, timezone).valueOf() / 1000) as UTCTimestamp;
          const value = Number((parseInt(newData.open, 10) / 10 ** 8).toFixed(3));
          updatedPriceData = [{ time, value }];
        } else {
          const sorted = wsData.sort(
            (a: any, b: any) =>
              moment.tz(a.time, timezone).valueOf() -
              moment.tz(b.time, timezone).valueOf()
          );
          const unduplicatedData = removeDuplicateTimestamps(sorted);
          updatedPriceData = unduplicatedData.map((d: any) => ({
            time: (moment.tz(d.time, timezone).valueOf() / 1000) as UTCTimestamp,
            value: Number((parseInt(d.open, 10) / 10 ** 8).toFixed(3)),
          }));
        }
      }

      if (chartRef.current && updatedPriceData.length > 0) {
        const currentData = chartRef.current.lineSeries.data() as PricePoint[];
        const merged = [...currentData, ...updatedPriceData].sort((a, b) => a.time - b.time);
        
        chartRef.current.lineSeries.setData(merged);
        
        // Update the visible range to show new data
        const timeScale = chartRef.current.chart.timeScale();
        timeScale.fitContent();
        
        // Update price scale with latest value
        const lastValue = updatedPriceData[updatedPriceData.length - 1].value;
        const priceRange = lastValue * 0.0005; // 0.05% range
        chartRef.current.lineSeries.applyOptions({
          autoscaleInfoProvider: () => ({
            priceRange: {
              minValue: lastValue - priceRange,
              maxValue: lastValue + priceRange,
            },
          }),
        });
      }
    };

    wsInstance.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      console.log("Closing WebSocket");
      if (wsInstance) {
        wsInstance.close();
      }
      wsInstance = null;
    };
  }, [asset, currentSource, selectedFrame]);

  //
  // 3) Handle SSE / API data from the DataProvider
  //
  useEffect(() => {
    if (!asset?.ticker || currentSource !== "api" || !data?.[asset.ticker]) return;
    if (!chartRef.current) return;

    const assetData = data[asset.ticker];
    const { lineSeries, chart } = chartRef.current;

    // Historical data
    if (Array.isArray(assetData.historical)) {
      const historicalData: PricePoint[] = assetData.historical
        .map((point: any) => {
          const rawTime = point.timestamp.toString().length > 10
            ? Math.floor(point.timestamp / 1000)
            : point.timestamp;
          const value = Number((parseInt(point.price, 16) / 10 ** assetData.decimals).toFixed(3));

          return {
            time: rawTime as UTCTimestamp,
            value,
          };
        })
        .filter((p) => !isNaN(p.value))
        .sort((a, b) => a.time - b.time);

      if (historicalData.length > 0) {
        lineSeries.setData(historicalData);
        
        // Calculate price range
        const prices = historicalData.map(d => d.value);
        const lastPrice = prices[prices.length - 1];
        const priceRange = lastPrice * 0.0005; // 0.05% range

        // Set fixed price range around the last price
        chart.priceScale('right').applyOptions({
          autoScale: false,
          scaleMargins: { top: 0.1, bottom: 0.3 },
        });
        
        // Set the visible price range
        lineSeries.applyOptions({
          autoscaleInfoProvider: () => ({
            priceRange: {
              minValue: lastPrice - priceRange,
              maxValue: lastPrice + priceRange,
            },
          }),
        });

        // Show all data points
        chart.timeScale().fitContent();
      }
    }

    // Latest point update
    if (assetData.last_updated_timestamp && assetData.price) {
      const rawTime = assetData.last_updated_timestamp.toString().length > 10
        ? Math.floor(assetData.last_updated_timestamp / 1000)
        : assetData.last_updated_timestamp;

      const value = Number((parseInt(assetData.price, 16) / 10 ** assetData.decimals).toFixed(3));
      if (!isNaN(value) && value > 0) {
        const currentData = lineSeries.data() as PricePoint[];
        
        // Update with new point
        lineSeries.update({
          time: rawTime as UTCTimestamp,
          value,
        });

        // Update price scale to keep centered around latest price
        const priceRange = value * 0.0005; // 0.05% range
        lineSeries.applyOptions({
          autoscaleInfoProvider: () => ({
            priceRange: {
              minValue: value - priceRange,
              maxValue: value + priceRange,
            },
          }),
        });

        // Ensure we can see the latest updates
        const timeScale = chart.timeScale();
        const visibleRange = timeScale.getVisibleLogicalRange();
        if (visibleRange !== null) {
          const newRange = {
            from: visibleRange.from,
            to: visibleRange.to + 1,
          };
          timeScale.setVisibleLogicalRange(newRange);
        }
      }
    }
  }, [asset?.ticker, data, currentSource]);

  return (
    <div className="w-full flex-col justify-between gap-8 md:flex-row md:gap-5">
      {currentSource !== "api" && (
        <div className="flex flex-col gap-3 pb-4 sm:flex-row sm:gap-10">
          <Listbox value={currentSource} onChange={switchSource}>
            <div className="relative md:w-auto">
              <Listbox.Button className="relative flex w-full cursor-pointer flex-row justify-center rounded-full border border-lightBlur py-3 px-6 text-center text-sm text-lightGreen focus:outline-none sm:w-fit">
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
                  {options.map((option, idx) => (
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
        className="min-h-[400px] w-full rounded-xl border border-lightBlur bg-darkGreen p-8"
      />
    </div>
  );
};

export default AssetChart;
