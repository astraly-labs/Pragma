import React from "react";
import GreenUpperText from "../common/GreenUpperText";
import classNames from "classnames";
import GreenText from "../common/GreenText";
import EventBox from "../common/EventBox";

const events = [
  {
    name: "Eth CC",
    location: "Brussels",
    date: "8 JUL 2024",
    link: "https://www.ethcc.io/",
  },
  {
    name: "Token 2049",
    location: "Singapore",
    date: "18 SEP 2024",
    link: "https://www.asia.token2049.com/",
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
      <h2 className="pb-6 text-lightGreen">Find us at these events</h2>
      <GreenText>
        Meet us at these events. Coffee is on us, we like crypto, oracles,
        Austrian economy, elliptic curves, Rust, Cairo and so much more.{" "}
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
