import React from "react";

export interface Stat {
  label: string;
  value: string;
}

interface StatsProps {
  stats: Stat[];
}

const Stats: React.FC<StatsProps> = ({ stats }) => (
  <dl className="grid w-full max-w-3xl grid-cols-2 gap-x-4 gap-y-8">
    {stats.map(({ label, value }) => (
      <div key={label} className="border-grey border-t-2 pt-6 font-sans">
        <dt className="mb-1 text-base font-medium text-white lg:text-lg">
          {label}
        </dt>
        <dd className="text-primary text-3xl font-extrabold tracking-tight lg:text-4xl">
          {value}
        </dd>
      </div>
    ))}
  </dl>
);

export default Stats;
