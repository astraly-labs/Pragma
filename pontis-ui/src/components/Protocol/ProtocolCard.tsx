import React from "react";

export const protocolCategories = [
  "All",
  "Money-Market",
  "Social Wallet",
  "Borrowing",
] as const;

export interface Protocol {
  name: string;
  category: typeof protocolCategories[number];
  src: string;
  description: string;
}

const ProtocolCard: React.FC<Protocol> = ({
  name,
  category,
  src,
  description,
}) => (
  <article className="space-y-4">
    <div className="aspect-square h-48">
      <img className="object-cover" src={src} alt="" />
    </div>

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
