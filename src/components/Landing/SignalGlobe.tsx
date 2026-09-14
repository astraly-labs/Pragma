"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export default function SignalGlobe() {
  const container = useRef<HTMLDivElement>(null);
  const meridians = useRef<(SVGPathElement | null)[]>([]);
  const satellite = useRef<SVGCircleElement>(null);
  const rotation = useRef(0);
  const drag = useRef<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let frame: number;
    let previous = 0;
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    if (container.current) observer.observe(container.current);
    const draw = (time: number) => {
      const delta = previous ? Math.min(time - previous, 50) : 0;
      previous = time;
      if (visible) {
        if (!paused && !reducedMotion && drag.current === null) {
          rotation.current += delta * 0.00016;
        }
        meridians.current.forEach((path, index) => {
          if (!path) return;
          const angle = rotation.current + (index * Math.PI) / 6;
          const points = Array.from({ length: 41 }, (_, i) => {
            const latitude = -Math.PI / 2 + (i * Math.PI) / 40;
            const x = 185 * Math.cos(latitude) * Math.sin(angle);
            const y = 185 * Math.sin(latitude);
            const z = 185 * Math.cos(latitude) * Math.cos(angle);
            return `${i === 0 ? "M" : "L"}${(280 + x).toFixed(2)},${(250 + y * 0.96 + z * 0.28).toFixed(2)}`;
          });
          path.setAttribute("d", points.join(" "));
          path.setAttribute("opacity", Math.cos(angle) > 0 ? ".8" : ".18");
        });
        satellite.current?.setAttribute(
          "cx",
          String(280 + Math.cos(rotation.current * 1.8) * 246)
        );
        satellite.current?.setAttribute(
          "cy",
          String(250 + Math.sin(rotation.current * 1.8) * 65)
        );
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [paused, reducedMotion]);

  return (
    <div className="signal-art" ref={container}>
      <div className="art-topline">
        <span>PRAGMA / DATA NETWORK</span>
        <span>01 → ∞</span>
      </div>
      <svg
        viewBox="0 0 560 520"
        role="img"
        aria-label="Rotating globe of data signals. Drag or use left and right arrow keys to rotate."
        tabIndex={0}
        className="signal-globe"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            rotation.current += event.key === "ArrowRight" ? 0.15 : -0.15;
          }
        }}
        onPointerDown={(event) => {
          drag.current = event.clientX;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (drag.current === null) return;
          rotation.current += (event.clientX - drag.current) * 0.008;
          drag.current = event.clientX;
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
        onLostPointerCapture={() => {
          drag.current = null;
        }}
      >
        <defs>
          <radialGradient id="signal-fill">
            <stop offset="0" stopColor="#ff9566" stopOpacity=".2" />
            <stop offset="1" stopColor="#ff6b35" stopOpacity=".02" />
          </radialGradient>
        </defs>
        <g stroke="#ff7946" fill="none" strokeWidth=".8">
          <circle cx="280" cy="250" r="185" fill="url(#signal-fill)" />
          {Array.from({ length: 12 }, (_, i) => (
            <path
              key={i}
              ref={(node) => {
                meridians.current[i] = node;
              }}
            />
          ))}
          {[-60, -40, -20, 0, 20, 40, 60].map((degrees) => {
            const latitude = (degrees * Math.PI) / 180;
            return (
              <ellipse
                key={degrees}
                cx="280"
                cy={250 + Math.sin(latitude) * 185 * 0.96}
                rx={Math.cos(latitude) * 185}
                ry={Math.cos(latitude) * 185 * 0.28}
                opacity=".5"
              />
            );
          })}
          <g transform="rotate(-28 280 250)">
            <ellipse
              cx="280"
              cy="250"
              rx="246"
              ry="65"
              stroke="#e4dfd3"
              strokeOpacity=".5"
            />
            <circle
              ref={satellite}
              cx="526"
              cy="250"
              r="5"
              fill="#f2f0e9"
              stroke="none"
            />
          </g>
          <ellipse
            cx="280"
            cy="250"
            rx="222"
            ry="65"
            transform="rotate(44 280 250)"
            strokeOpacity=".5"
          />
          <path
            d="M31 250H529M280 23V480"
            strokeDasharray="2 7"
            strokeOpacity=".3"
          />
        </g>
        <g fill="#ff7946">
          <circle cx="114" cy="157" r="5" />
          <circle cx="417" cy="354" r="5" />
          <circle cx="280" cy="65" r="4" />
        </g>
        <g fill="#f3efe5" fontSize="10" fontFamily="monospace">
          <text x="34" y="134">
            SOURCES
          </text>
          <text x="400" y="395">
            ONCHAIN
          </text>
          <text x="293" y="43">
            DATA IN MOTION
          </text>
        </g>
      </svg>
      <div className="art-bottomline">
        <span>DRAG TO EXPLORE</span>
        <button
          type="button"
          className="globe-control"
          aria-label={
            paused || reducedMotion
              ? "Play globe animation"
              : "Pause globe animation"
          }
          onClick={() => {
            setPaused(!(paused || reducedMotion));
            setReducedMotion(false);
          }}
        >
          {paused || reducedMotion ? <Play size={12} /> : <Pause size={12} />}
          {paused || reducedMotion ? "PLAY" : "PAUSE"}
        </button>
      </div>
    </div>
  );
}
