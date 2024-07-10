import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import { AssetPair } from "./AssetBox";

interface ChartBoxProps {
  assetPair: AssetPair;
  box?: boolean;
  className?: string;
  colors?: {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
  };
}

export const ChartBox: React.FC<ChartBoxProps> = ({
  assetPair,
  box = true,
  className,
  colors = {},
}) => {
  const {
    backgroundColor = "#082F28",
    lineColor = "#15FF81",
    textColor = "black",
    areaTopColor = "#3CF46742",
    areaBottomColor = "#FFFFFF00",
  } = colors;

  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor: "#B5F0E5",
        fontFamily: "IBM Plex Mono",
        fontSize: 12,
      },
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
        secondsVisible: true,
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          color: "#B5F0E51F",
        },
      },
      width: chartContainerRef.current?.clientWidth ?? 300,
      height: 300,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor: lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });

    if (assetPair == undefined) {
      newSeries.setData([]);
    } else {
      newSeries.setData(assetPair.priceData);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      if (chart) {
        chart.remove();
      }
    };
  }, [
    assetPair,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return (
    <div className={box ? styles.chartBox : className}>
      <div className="font-mono text-xs text-lightGreen">
        {(box ? assetPair?.ticker : "") ?? "LOADING..."}
      </div>
      <div className={styles.chartLayout} ref={chartContainerRef} />
    </div>
  );
};
