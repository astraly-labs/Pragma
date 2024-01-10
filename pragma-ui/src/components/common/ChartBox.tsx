import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";

export const ChartBox = (props) => {
  const {
    data,
    colors: {
      backgroundColor = "#082F28",
      lineColor = "#15FF81",
      textColor = "black",
      areaTopColor = "#3CF46742",
      areaBottomColor = "#FFFFFF00",
    } = {},
    pairid,
  } = props;

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
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          color: "#B5F0E51F",
        },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return (
    <div className={styles.chartBox}>
      <div className="font-mono text-xs text-lightGreen">{pairid}</div>
      <div className={styles.chartLayout} ref={chartContainerRef} />
    </div>
  );
};
