import React from "react";

export interface Stat {
  label: string;
  value: string;
}

interface StatsProps {
  stats: Stat[];
}

const Stats: React.FC<StatsProps> = ({ stats }) => (
  <dl className="mx-auto grid max-w-3xl grid-cols-2 gap-x-4 gap-y-8">
    {stats.map(({ label, value }) => (
      <div key={label} className="border-t-2 border-slate-200 pt-6 font-mono">
        <dt className="mb-1 text-base font-medium text-slate-500 lg:text-lg">
          {label}
        </dt>
        <dd className="text-3xl font-extrabold tracking-tight text-slate-900 lg:text-4xl">
          {value}
        </dd>
      </div>
    ))}
  </dl>
);

export default Stats;
