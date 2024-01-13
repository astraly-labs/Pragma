import React from "react";
import GreenUpperText from "../common/GreenUpperText";
import classNames from "classnames";
import GreenTitle from "../common/GreenTitle";
import GreenText from "../common/GreenText";
import EventBox from "../common/EventBox";

const events = [
  {
    name: "ETH Denver",
    location: "Denver",
    date: "23 FEB 2024",
    link: "https://www.ethdenver.com/",
  },
  {
    name: "The Mu",
    location: "Buenos Aires",
    date: "MARCH 2024",
    link: "https://twitter.com/themu_xyz",
  },
  {
    name: "Eth CC",
    location: "Brussels",
    date: "8 JUL 2024",
    link: "https://www.ethcc.io/",
  },
];

const Events = () => (
  <div
    className={classNames(
      "align-row max-w-screen flex w-full flex-col gap-10 overflow-hidden py-4 md:flex-row md:gap-28 md:py-28 lg:px-10"
    )}
  >
    <div className="flex w-full flex-col justify-center md:w-5/12">
      <GreenUpperText className="pb-3">Events</GreenUpperText>
      <GreenTitle className="pb-6">Find us at these events</GreenTitle>
      <GreenText>
        Pragma Network has a uniquely robust and transparent architecture made
        possible by leveraging new zk-technology.
      </GreenText>
    </div>
    <div className="flex w-full flex-col justify-start md:w-6/12">
      {events.map((event, index: number) => (
        <EventBox
          name={event.name}
          location={event.location}
          date={event.date}
          link={event.link}
          key={index}
          last={index === events.length - 1}
        />
      ))}
    </div>
  </div>
);

export default Events;
