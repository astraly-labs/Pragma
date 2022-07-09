import React from "react";

interface InfoProps {
  title: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}
const InfoCard: React.FC<InfoProps> = ({ title, icon: Icon }) => (
  <div className="relative col-span-2 flex h-full w-full flex-col space-y-6 rounded-lg bg-white py-8 px-9 shadow-xl">
    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500 text-white">
      <Icon className="h-6 w-6" aria-hidden="true" />
    </div>
    <p className="text-xl font-medium text-slate-700 sm:text-2xl">{title}</p>
  </div>
);

export default InfoCard;
