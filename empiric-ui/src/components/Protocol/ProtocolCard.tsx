import React from "react";
import { Protocol } from "./ProtocolSection";

const ProtocolCard: React.FC<Protocol> = ({
  name,
  category,
  src,
  description,
}) => (
  <article className="space-y-4 md:space-y-8">
    <img className="mx-auto h-12 sm:h-14 md:h-16" src={src} alt="" />

    <div className="space-y-2">
      <header className="space-y-1 text-lg font-medium leading-6">
        <h3>{name}</h3>
        <p className="text-indigo-600">{category}</p>
      </header>
      {description && <p className="prose prose-slate">{description}</p>}
    </div>
  </article>
);
export default ProtocolCard;
