import React from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import GreenUpperText from "./GreenUpperText";
import { ArrowRightIcon } from "@heroicons/react/outline";

interface EventsProps {
  name: string;
  location: string;
  date: string;
  link: string;
  last?: boolean;
  className?: string;
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

const EventBox: React.FC<EventsProps> = ({
  name,
  location,
  date,
  link,
  last,
  className,
  ...props
}) => (
  <div
    className={classNames(
      className,
      styles.eventBox,
      last ? styles.lastBox : "",
      "items- grid grid-cols-4"
    )}
    {...props}
  >
    <h5 className="leading-14 flex h-full items-center  text-lightGreen">
      {name}
    </h5>
    <GreenUpperText className="flex h-full items-center pt-1 md:tracking-wider">
      {location}
    </GreenUpperText>
    <GreenUpperText className="flex h-full items-center pt-1 md:tracking-wider">
      {date}
    </GreenUpperText>
    <a
      href={link}
      className="ml-auto cursor-pointer	rounded-full border border-mint bg-transparent p-3 text-mint transition-colors duration-300 hover:bg-mint hover:text-darkGreen"
      aria-label="Link to the Event"
    >
      <ArrowRightIcon className="w-5 cursor-pointer" />
    </a>
  </div>
);

export default EventBox;
