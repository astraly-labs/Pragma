"use client";

import React, { useEffect, useRef, memo } from "react";

const TICKER_TO_TV_SYMBOL: Record<string, string> = {
  "BTC/USD": "BINANCE:BTCUSDC",
  "ETH/USD": "BINANCE:ETHUSDC",
  "STRK/USD": "BYBIT:STRKUSDC",
  "SUI/USD": "BINANCE:SUIUSDC",
  "AAVE/USD": "BINANCE:AAVEUSDC",
  "SOL/USD": "BINANCE:SOLUSDC",
  "DAI/USD": "BINANCE:DAIUSDC",
  "LORDS/USD": "BYBIT:LORDSUSDC",
  "EKUBO/USD": "BYBIT:EKUBOUSDC",
  "NSTR/USD": "BYBIT:NSTRUSDC",
};

interface ChartBoxProps {
  ticker: string;
  height?: number;
  className?: string;
}

const ChartBoxInner: React.FC<ChartBoxProps> = ({
  ticker,
  height = 480,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const tvSymbol =
    TICKER_TO_TV_SYMBOL[ticker] ||
    `BINANCE:${ticker.replace("/", "").replace("USD", "USDC")}`;

  useEffect(() => {
    if (!containerRef.current) return;
    const node = containerRef.current;
    node.innerHTML = "";

    const widgetContainer = document.createElement("div");
    widgetContainer.className = "tradingview-widget-container__widget";
    widgetContainer.style.height = "calc(100% + 4px)";
    widgetContainer.style.width = "calc(100% + 4px)";
    widgetContainer.style.margin = "-2px";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: tvSymbol,
      width: "100%",
      height: "100%",
      locale: "en",
      dateRange: "1M",
      colorTheme: "dark",
      isTransparent: true,
      autosize: true,
      largeChartUrl: "",
      chartOnly: false,
      noTimeScale: false,
    });

    node.appendChild(widgetContainer);
    node.appendChild(script);

    return () => {
      node.innerHTML = "";
    };
  }, [tvSymbol]);

  return (
    <div
      className={`overflow-hidden rounded-2xl bg-[#082F28] ${className || ""}`}
      style={{ height: `${height}px` }}
    >
      <div
        ref={containerRef}
        className="tradingview-widget-container overflow-hidden"
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
};

export const ChartBox = memo(ChartBoxInner);
