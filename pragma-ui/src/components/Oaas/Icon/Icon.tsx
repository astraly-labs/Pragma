import React from "react";
import SVG from "react-inlinesvg";

interface IconProps {
  name: string | { src: string };
  className?: string;
}

const Icon = ({ name, className }: IconProps) => {
  const src = typeof name === "string" ? name : name.src;
  return <SVG src={src} className={className} />;
};

export default Icon;
