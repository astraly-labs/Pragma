import React from "react";
import QuoteIcon from "../common/QuoteIcon";

interface ProtocolCardProps {
  name: string;
  category: string;
  description: string;
  src: string;
}

const ProtocolCard: React.FC<ProtocolCardProps> = ({
  name,
  category,
  description,
  src,
}) => (
  <figure className="relative h-full rounded-lg bg-slate-50 p-6 shadow-xl shadow-slate-900/10">
    <figcaption className="relative flex flex-col items-center justify-between border-b border-slate-100 pb-6">
      <img src={src} alt={`${name} logo`} className="h-12 w-auto" />
    </figcaption>
    <div className="relative mt-6">
      <header className="mb-4 space-y-1 text-lg font-medium leading-6">
        <h3 className="text-slate-900">{name}</h3>
        <p className="text-indigo-600">{category}</p>
      </header>
      <blockquote className="relative">
        <QuoteIcon className="absolute top-0 left-0 fill-slate-200" />
        <p className="prose prose-slate relative whitespace-pre-line">
          {description}
        </p>
      </blockquote>
    </div>
  </figure>
);

export default ProtocolCard;
