import React, { useId } from "react";

interface DotsProps {
  width: number;
  height: number;
  className: string;
}

const Dots: React.FC<DotsProps> = ({ width, height, className }) => {
  const patternId = useId();
  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill="none"
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={patternId}
          x={0}
          y={0}
          width={20}
          height={20}
          patternUnits="userSpaceOnUse"
        >
          <rect
            x={0}
            y={0}
            width={4}
            height={4}
            className="text-slate-200"
            fill="currentColor"
          />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${patternId})`} />
    </svg>
  );
};

export default Dots;
