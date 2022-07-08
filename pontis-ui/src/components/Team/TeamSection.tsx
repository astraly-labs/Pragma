import React from "react";
import TeamCard, { Person } from "./TeamCard";

const people: Person[] = [
  {
    name: "Oskar Schulz",
    role: "Founder",
    imageUrl: "/assets/team/oskar.jpeg",
    socials: [
      {
        name: "LinkedIn",
        src: "/assets/social/linkedin.svg",
        href: "https://www.linkedin.com/in/karl-oskar-s-058346131",
      },
      {
        name: "Twitter",
        src: "/assets/social/twitter.svg",
        href: "#",
      },
    ],
  },
  {
    name: "Jonas Nelle",
    role: "Founder",
    imageUrl: "assets/team/jonas.png",
    socials: [
      {
        name: "LinkedIn",
        src: "/assets/social/linkedin.svg",
        href: "https://www.linkedin.com/in/jonas-nelle/",
      },
      {
        name: "GitHub",
        src: "/assets/social/github.svg",
        href: "https://github.com/jonasalexander",
      },
    ],
  },
  {
    name: "Raphael Ruban",
    role: "Software Engineer",
    imageUrl: "assets/team/raphael.jpeg",
    socials: [
      {
        name: "LinkedIn",
        src: "/assets/social/linkedin.svg",
        href: "https://www.linkedin.com/in/ratoru/",
      },
      {
        name: "GitHub",
        src: "/assets/social/github.svg",
        href: "https://github.com/ratoru",
      },
    ],
  },
  {
    name: "Estragon Gross",
    role: "TBD",
    imageUrl: "/assets/team/estragon.jpeg",
    socials: [
      {
        name: "LinkedIn",
        src: "/assets/social/linkedin.svg",
        href: "https://www.linkedin.com/in/estragongross/",
      },
    ],
  },
  {
    name: "Kevin Jiang",
    role: "TBD",
    imageUrl: "/assets/team/kevin.jpeg",
    socials: [
      {
        name: "LinkedIn",
        src: "/assets/social/linkedin.svg",
        href: "https://www.linkedin.com/in/kevinjiang7/",
      },
    ],
  },
];

const TeamSection = () => (
  <ul
    role="list"
    className="w-full max-w-7xl space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
  >
    {people.map(({ name, role, imageUrl, socials }) => (
      <li key={name}>
        <TeamCard
          name={name}
          role={role}
          imageUrl={imageUrl}
          socials={socials}
        />
      </li>
    ))}
  </ul>
);
export default TeamSection;
