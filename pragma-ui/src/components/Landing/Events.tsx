import React from "react";
import GreenUpperText from "../common/GreenUpperText";
import classNames from "classnames";
import GreenTitle from "../common/GreenTitle";
import GreenText from "../common/GreenText";
import EventBox from "../common/EventBox";

const events = [
  {
    name: "DevConnect",
    location: "Paris",
    date: "23 DEC 2024",
    link: "/",
  },
  {
    name: "DevConnect",
    location: "Paris",
    date: "23 DEC 2024",
    link: "/",
  },
  {
    name: "DevConnect",
    location: "Paris",
    date: "23 DEC 2024",
    link: "/",
  },
];

const Events = () => (
  <div
    className={classNames(
      "align-row max-w-screen flex gap-28 overflow-hidden py-28"
    )}
  >
    <div className="flex w-5/12 flex-col justify-center">
      <GreenUpperText className="pb-3">Events</GreenUpperText>
      <GreenTitle className="pb-6">Find us at these events</GreenTitle>
      <GreenText>
        Pragma Network has a uniquely robust and transparent architecture made
        possible by leveraging new zk-technology.
      </GreenText>
    </div>
    <div className="flex w-6/12 flex-col justify-start">
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
