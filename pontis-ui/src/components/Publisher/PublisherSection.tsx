import React from "react";
import Container from "../common/Container";
import Header from "../Header";
import PublisherCard, { PublisherCardProps } from "./PublisherCard";

const publishers: PublisherCardProps[] = [
  {
    name: "Gemini",
    src: "/assets/providers/gemini.svg",
    description:
      "Ipsum dolore qui do nostrud elit dolore. Pariatur ad ea aliquip. Aliquip proident eu labore sint. Id ullamco et excepteur veniam nisi quis dolor consectetur. Irure ut enim aute. Nostrud in labore dolore labore laboris incididunt sint nostrud. Pariatur deserunt eiusmod irure dolore esse veniam incididunt exercitation ad aliquip commodo laborum excepteur proident pariatur. Deserunt nisi qui reprehenderit mollit sit voluptate aliqua consequat aute ullamco est fugiat exercitation.",
  },
  {
    name: "Gemini",
    src: "/assets/providers/gemini.svg",
    description:
      "Ipsum dolore qui do nostrud elit dolore. Pariatur ad ea aliquip. Aliquip proident eu labore sint. Id ullamco et excepteur veniam nisi quis dolor consectetur. Irure ut enim aute. Nostrud in labore dolore labore laboris incididunt sint nostrud. Pariatur deserunt eiusmod irure dolore esse veniam incididunt exercitation ad aliquip commodo laborum excepteur proident pariatur. Deserunt nisi qui reprehenderit mollit sit voluptate aliqua consequat aute ullamco est fugiat exercitation.",
  },
  {
    name: "Gemini",
    src: "/assets/providers/gemini.svg",
    description:
      "Ipsum dolore qui do nostrud elit dolore. Pariatur ad ea aliquip. Aliquip proident eu labore sint. Id ullamco et excepteur veniam nisi quis dolor consectetur. Irure ut enim aute. Nostrud in labore dolore labore laboris incididunt sint nostrud. Pariatur deserunt eiusmod irure dolore esse veniam incididunt exercitation ad aliquip commodo laborum excepteur proident pariatur. Deserunt nisi qui reprehenderit mollit sit voluptate aliqua consequat aute ullamco est fugiat exercitation.",
  },
  {
    name: "Gemini",
    src: "/assets/providers/gemini.svg",
    description:
      "Ipsum dolore qui do nostrud elit dolore. Pariatur ad ea aliquip. Aliquip proident eu labore sint. Id ullamco et excepteur veniam nisi quis dolor consectetur. Irure ut enim aute. Nostrud in labore dolore labore laboris incididunt sint nostrud. Pariatur deserunt eiusmod irure dolore esse veniam incididunt exercitation ad aliquip commodo laborum excepteur proident pariatur. Deserunt nisi qui reprehenderit mollit sit voluptate aliqua consequat aute ullamco est fugiat exercitation.",
  },
  {
    name: "Gemini",
    src: "/assets/providers/gemini.svg",
    description:
      "Ipsum dolore qui do nostrud elit dolore. Pariatur ad ea aliquip. Aliquip proident eu labore sint. Id ullamco et excepteur veniam nisi quis dolor consectetur. Irure ut enim aute. Nostrud in labore dolore labore laboris incididunt sint nostrud. Pariatur deserunt eiusmod irure dolore esse veniam incididunt exercitation ad aliquip commodo laborum excepteur proident pariatur. Deserunt nisi qui reprehenderit mollit sit voluptate aliqua consequat aute ullamco est fugiat exercitation.",
  },
  {
    name: "Gemini",
    src: "/assets/providers/gemini.svg",
    description:
      "Ipsum dolore qui do nostrud elit dolore. Pariatur ad ea aliquip. Aliquip proident eu labore sint. Id ullamco et excepteur veniam nisi quis dolor consectetur. Irure ut enim aute. Nostrud in labore dolore labore laboris incididunt sint nostrud. Pariatur deserunt eiusmod irure dolore esse veniam incididunt exercitation ad aliquip commodo laborum excepteur proident pariatur. Deserunt nisi qui reprehenderit mollit sit voluptate aliqua consequat aute ullamco est fugiat exercitation.",
  },
];

const PublisherSeciton = () => (
  <div className="w-full bg-slate-50">
    <Container>
      <div className="space-y-24">
        <Header
          title="Your favorite giants"
          subtitle="Meet our publishers"
          text="At Pontis, we care about the integrity of our data. We ensure that only high quality data publishers join this list."
          href="#"
          hrefText="Find out how you can become a publisher"
        />
        <ul className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:max-w-none lg:grid-cols-3 lg:gap-10">
          {publishers.map(({ name, src, description }) => (
            <li key={name}>
              <PublisherCard name={name} src={src} description={description} />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  </div>
);

export default PublisherSeciton;
