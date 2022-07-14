import React from "react";

export interface Feature {
  name: string;
  description: string | React.ReactElement;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

const FeatureItem: React.FC<Feature> = ({ name, description, icon: Icon }) => (
  <div className="relative">
    <dt>
      <div className="absolute flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500 text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
        {name}
      </p>
    </dt>
    <dd className="mt-2 ml-16 text-base text-slate-600">{description}</dd>
  </div>
);

export default FeatureItem;
