import React from "react";
import { SocialMedia } from "../Navigation/PontisFooter";

export interface Person {
  name: string;
  role: string;
  imageUrl: string;
  socials?: SocialMedia[];
}

const TeamCard: React.FC<Person> = ({ name, role, imageUrl, socials }) => (
  <div className="space-y-4">
    <div className="aspect-[3/2]">
      <img
        className="rounded-lg object-cover shadow-lg"
        src={imageUrl}
        alt=""
      />
    </div>

    <div className="space-y-2">
      <div className="space-y-1 text-lg font-medium leading-6">
        <h3>{name}</h3>
        <p className="text-indigo-600">{role}</p>
      </div>
      <ul role="list" className="flex space-x-5">
        {socials.map(({ name, src, href }) => (
          <li key={name}>
            <a href={href} className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">{name}</span>
              <img src={src} className="h-5 w-5 stroke-slate-500" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
export default TeamCard;
