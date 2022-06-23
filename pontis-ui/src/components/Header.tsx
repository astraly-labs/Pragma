import React from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  text: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, text }) => (
  <div className="mx-auto w-full md:max-w-3xl">
    <h2 className="text-large mb-2 uppercase tracking-wide text-slate-600 sm:text-2xl md:mb-4">
      {subtitle}
    </h2>
    <h1 className="mb-4 text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl sm:leading-tight md:mb-6 md:text-7xl">
      {title}
    </h1>
    <p className="prose prose-slate lg:prose-xl">{text}</p>
  </div>
);

export default Header;
