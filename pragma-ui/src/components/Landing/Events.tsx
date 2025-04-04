import classNames from "classnames";
import GreenUpperText from "@/components/common/GreenUpperText";
import GreenText from "@/components/common/GreenText";
import EventBox from "@/components/common/EventBox";

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
