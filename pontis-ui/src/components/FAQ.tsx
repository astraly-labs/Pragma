import React from "react";

const faqs = [
  {
    question: "Does Pontis only provide financial data?",
    answer:
      "Pontis is starting with financial data but will quickly expand to sports, weather, news — any event that happens anywhere should be available on-chain.",
  },
  {
    question: "What's the best thing about logo?",
    answer:
      "I don't know, but the square is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What's the best thing about the square?",
    answer:
      "I don't know, but the corners are a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
];

const FAQ = () => (
  <div className="w-full max-w-7xl divide-y-2 divide-slate-200">
    <h2 className="text-3xl font-extrabold text-slate-900">
      Frequently asked questions
    </h2>
    <div className="mt-6 pt-10">
      <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 md:space-y-0">
        {faqs.map((faq, i) => (
          <div key={i}>
            <dt className="text-lg font-medium leading-6 text-slate-900 lg:text-xl">
              {faq.question}
            </dt>
            <dd className="prose prose-slate mt-2">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
);

export default FAQ;
