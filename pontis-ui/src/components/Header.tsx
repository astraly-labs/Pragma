import React from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  text: string;
  href?: string;
  hrefText?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  text,
  href,
  hrefText,
}) => (
  <div className="mx-auto w-full max-w-3xl">
    {subtitle !== undefined && (
      <h2 className="mb-2 text-xl uppercase tracking-wide text-slate-600 sm:text-2xl md:mb-4">
        {subtitle}
      </h2>
    )}
    <h1 className="mb-4 text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl sm:leading-tight md:mb-6 md:text-7xl">
      {title}
    </h1>
    <p className="prose prose-slate lg:prose-xl">{text}</p>
    {href && hrefText && (
      <div className="mt-6">
        <a href={href} className="text-xl font-medium text-indigo-500">
          {hrefText} &nbsp;&rarr;
        </a>
      </div>
    )}
  </div>
);

export default Header;
