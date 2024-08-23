import React, { Fragment, useMemo, useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import SearchBar from "../Navigation/SearchBar";
import AssessmentPopup from "./AssessmentPopup";
import Assessment from "./Assessment";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";

const ActiveAssessments = ({ assessments, loading }) => {
  const options = ["Active", "Settled", "Disputed"];
  const elements = Array(5).fill({
    image: `/assets/vectors/optimist.svg`,
    title: "Is Biden the winner of the US election?",
    timestamp: "2sAGO",
    output: "1000",
    bond: "10",
    startDispute: "60min",
    endDispute: `70min`,
  });
  const [filteredValue, setFilteredValue] = useState("");
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleInputChange = (value) => {
    setFilteredValue(value);
  };

  const filteredAssessments = assessments.filter((assessment) => {
    return assessment?.title
      ?.toLowerCase()
      .includes(filteredValue.toLowerCase());
  });

  const handleAssessmentClick = (assessment) => {
    setSelectedAssessment(assessment);
  };

  const handleClosePopup = () => {
    setSelectedAssessment(null);
  };

  return (
    <>
      <div
        className={classNames("w-full text-lightGreen", styles.darkGreenBox)}
      >
        <h3 className="pb-3 text-lightGreen">Assessments</h3>
        <div className="flex w-full flex-col-reverse gap-3 py-3 sm:flex-row">
          <div className="flex flex-col gap-3 smolScreen:flex-row">
            <div className="my-auto flex w-full flex-row justify-center rounded-full border border-lightBlur py-3 px-6 text-center text-sm text-lightGreen md:w-auto">
              Nb assessments: {filteredAssessments.length}
            </div>
            <Listbox value={selectedOption} onChange={setSelectedOption}>
              <div className="relative w-full md:w-auto">
                <Listbox.Button className="relative flex w-full cursor-pointer flex-row justify-center rounded-full border border-lightBlur py-3 px-6 text-center text-sm text-lightGreen focus:outline-none">
                  <span className="block truncate">{selectedOption}</span>
                  <Image
                    className="my-auto pl-2"
                    height={16}
                    width={16}
                    alt="arrowDown"
                    src="/assets/vectors/arrowDown.svg"
                  />
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-green py-1 text-sm text-lightGreen ring-1 backdrop-blur focus:outline-none">
                    {options.map((option, optionIdx) => (
                      <Listbox.Option
                        key={optionIdx}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-10 pr-4 text-lightGreen ${
                            active ? "opacity-50 " : ""
                          }`
                        }
                        value={option}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate text-lightGreen ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {option}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <div className="sm:ml-auto">
            <SearchBar onInputChange={handleInputChange} />
          </div>
        </div>
        <div className="w-full overflow-auto">
          <div className={styles.assessment}>
            <div className="flex cursor-pointer flex-row gap-2	 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Assertion
            </div>
            <div className="flex translate-x-2 cursor-pointer flex-row gap-1 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Output{" "}
            </div>
            <div className="flex translate-x-2 cursor-pointer flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Bond
            </div>
            <div className="flex cursor-pointer flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Challenge Period
            </div>
          </div>

          {loading &&
            elements.map((element, index) => (
              <Assessment assessment={element} key={index} loading={true} />
            ))}
          {!loading &&
            filteredAssessments.map((assessment, assetIdx) => (
              <div
                key={assetIdx}
                onClick={() => handleAssessmentClick(assessment)}
                className="cursor-pointer"
              >
                <Assessment
                  assessment={assessment}
                  key={assetIdx}
                  loading={false}
                />
              </div>
            ))}
          {!loading && filteredAssessments.length === 0 && (
            <div className="py-2 font-mono text-xs text-lightGreen">
              No assessments for your search
            </div>
          )}
        </div>
      </div>{" "}
      {selectedAssessment && (
        <AssessmentPopup
          assessment={selectedAssessment}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};

export default ActiveAssessments;
