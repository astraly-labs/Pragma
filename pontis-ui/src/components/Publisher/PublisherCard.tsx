import React from "react";
import QuoteIcon from "../common/QuoteIcon";

export interface PublisherCardProps {
  src: string;
  name: string;
  description: string;
}

const PublisherCard: React.FC<PublisherCardProps> = ({
  src,
  name,
  description,
}) => (
  <figure className="relative rounded-lg bg-white p-6 shadow-xl shadow-slate-900/10">
    <figcaption className="relative flex flex-col items-center justify-between border-b border-slate-100 pb-6">
      <div className="h-full w-48 overflow-hidden">
        <img src={src} alt={`${name} logo`} />
      </div>
    </figcaption>
    <div className="relative mt-6">
      <h3 className="relative mb-3 text-2xl font-semibold text-slate-900">
        {name}
      </h3>
      <blockquote className="relative">
        <QuoteIcon className="absolute top-0 left-0 fill-slate-100" />
        <p className="prose prose-slate relative">{description}</p>
      </blockquote>
    </div>
  </figure>
);

export default PublisherCard;
