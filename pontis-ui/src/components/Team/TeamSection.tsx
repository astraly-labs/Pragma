import React from "react";
import Container from "../common/Container";
import Header from "../Header";
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
        name: "GitHub",
        src: "/assets/social/github.svg",
        href: "https://github.com/ratoru",
      },
    ],
  },
];

const TeamSection = () => (
  <div className="w-full bg-slate-50">
    <Container>
      <div className="space-y-24">
        <Header
          title="Developed by experts"
          subtitle="Meet our team"
          text="At Pontis we are building a culture around bright people that want to move fast and embrace honest feedback."
          href="#"
          hrefText="In fact, give us feedback right now"
        />
        <ul
          role="list"
          className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
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
      </div>
    </Container>
  </div>
);
export default TeamSection;
