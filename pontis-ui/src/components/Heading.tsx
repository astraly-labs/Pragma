import React from "react";

interface HeadingProps {
  title: string;
  subtitle?: string;
  text?: string;
  href?: string;
  hrefText?: string;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  text,
  href,
  hrefText,
}) => (
  <header className="w-full max-w-3xl">
    {subtitle !== undefined && (
      <p className="mb-2 text-lg uppercase tracking-wide text-slate-600 sm:text-xl md:mb-4 md:text-2xl">
        {subtitle}
      </p>
    )}
    <h2 className="mb-5 text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl sm:leading-tight md:mb-8 md:text-5xl">
      {title}
    </h2>
    {text && <p className="prose prose-slate lg:prose-xl">{text}</p>}
    {href && hrefText && (
      <p className="prose prose-slate mt-4 prose-a:no-underline lg:prose-xl">
        <a href={href} className="font-medium text-indigo-500">
          {hrefText} &nbsp;&rarr;
        </a>
      </p>
    )}
  </header>
);

export default Heading;
