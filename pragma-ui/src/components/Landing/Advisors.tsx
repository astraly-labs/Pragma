import React from "react";

interface Advisor {
  name: string;
  role: string;
  src: string;
}

const advisors: Advisor[] = [
  {
    name: "guiltygyoza",
    role: "Topology",
    src: "/assets/advisors/guiltygyoza.webp",
  },
  {
    name: "Peteris Erins",
    role: "Yagi",
    src: "/assets/advisors/peteris-erins.webp",
  },
  {
    name: "Milan Cermak",
    role: "Aura Protocol",
    src: "/assets/advisors/milan-cermak.webp",
  },
];

const Advisors = () => (
  <div className="w-full max-w-3xl font-mono">
    <h3 className="mb-6 text-base font-medium text-slate-500 lg:text-lg">
      Ecosystem Advisors
    </h3>
    <ul className="flex w-full justify-between sm:grid sm:grid-cols-3">
      {advisors.map(({ name, role, src }) => (
        <li key={src}>
          <figure className="space-y-4">
            <img
              className="mx-auto h-16 w-16 rounded-full bg-slate-200 shadow-inner lg:h-20 lg:w-20"
              src={src}
              alt=""
            />
            <figcaption className="space-y-1 text-center text-sm font-medium lg:text-base">
              <p className="">{name}</p>
              <p className="text-indigo-600">{role}</p>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  </div>
);

export default Advisors;
