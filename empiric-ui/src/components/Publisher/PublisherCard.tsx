import React from "react";
import QuoteIcon from "../common/QuoteIcon";
import { PublisherCardProps } from "./PublishersSection";

const PublisherCard: React.FC<PublisherCardProps> = ({
  src,
  name,
  description,
  href,
}) => (
  <figure className="relative h-full rounded-lg bg-white p-6 shadow-xl shadow-slate-900/10">
    <figcaption className="relative flex flex-col items-center justify-between border-b border-slate-100 pb-6">
      <a className={href}>
        <img src={src} alt={`${name} logo`} className="h-12 w-auto" />
      </a>
    </figcaption>
    <div className="relative mt-6">
      <h3 className="relative mb-3 text-2xl font-semibold text-slate-900">
        {name}
      </h3>
      <blockquote className="relative">
        <QuoteIcon className="absolute top-0 left-0 fill-slate-100" />
        <p className="prose prose-slate relative whitespace-pre-line">
          {description}
        </p>
      </blockquote>
    </div>
  </figure>
);

export default PublisherCard;
