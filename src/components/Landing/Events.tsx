"use client";

import clsx from "clsx";
import { motion } from "motion/react";
import GreenUpperText from "@/components/common/GreenUpperText";
import GreenText from "@/components/common/GreenText";
import EventBox from "@/components/common/EventBox";
import { fadeInUp } from "@/lib/animations";

const events = [
  {
    name: "Campus",
    location: "Punta Cana",
    date: "3 NOV 2024",
    link: "https://www.campuspuntacana.com/apply",
  },
  {
    name: "DevCon",
    location: "Thailand",
    date: "12 NOV 2024",
    link: "https://devcon.org/en/",
  },
];

const Events = () => (
  <div
    className={clsx(
      "align-row max-w-screen flex w-full flex-col gap-10 overflow-hidden py-4 md:flex-row md:gap-28 md:py-28 lg:px-10"
    )}
  >
    <motion.div
      className="flex w-full flex-col justify-center md:w-5/12"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <GreenUpperText className="pb-3">Events</GreenUpperText>
      <h2 className="pb-6 text-lightGreen">Find us at these events</h2>
      <GreenText>
        Meet us at these events. Coffee is on us, we like crypto, oracles,
        Austrian economy, elliptic curves, Rust, Cairo and so much more.{" "}
      </GreenText>
    </motion.div>
    <div className="relative flex w-full flex-col justify-start md:w-6/12">
      <div className="absolute left-0 top-0 bottom-0 hidden w-px bg-linear-to-b from-transparent via-mint/20 to-transparent md:block" />
      {events.map((event, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          className="relative pl-6 md:pl-8"
        >
          <div className="absolute left-0 top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full bg-mint/40 md:block" />
          <EventBox
            name={event.name}
            location={event.location}
            date={event.date}
            link={event.link}
            last={index === events.length - 1}
          />
        </motion.div>
      ))}
    </div>
  </div>
);

export default Events;
