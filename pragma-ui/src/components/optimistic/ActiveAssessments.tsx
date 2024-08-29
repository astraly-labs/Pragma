import React, { Fragment, useState, useEffect } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import SearchBar from "../Navigation/SearchBar";
import AssessmentPopup from "./AssessmentPopup";
import Assessment from "./Assessment";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";
import dotenv from "dotenv";
import NetworkSelection from "../common/NetworkSelection";

dotenv.config();

const ITEMS_PER_PAGE = 10;

const ActiveAssessments = ({ assessments, loading, onAssertionTypeChange }) => {
  const options = ["Active", "Settled", "Disputed"];
  const [filteredValue, setFilteredValue] = useState<string | undefined>(
    undefined
  );
  const [network, setNetwork] = useState<string>("sepolia");
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedComponents, setPaginatedComponents] = useState([]);

  const handleInputChange = (value) => {
    setFilteredValue(value || undefined);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    onAssertionTypeChange(option);
  };

  const filteredAssessments = filteredValue
    ? assessments.filter((assessment) =>
        assessment?.title?.toLowerCase().includes(filteredValue.toLowerCase())
      )
    : assessments;

  const handleAssessmentClick = (assessment) => {
    setSelectedAssessment(assessment);
  };

  const handleClosePopup = () => {
    setSelectedAssessment(null);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedComponents(assessments.slice(startIndex, endIndex));
  }, [currentPage, assessments]);

  const totalPages = Math.ceil(assessments.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={classNames(
              "mx-1 rounded-full px-4 py-2",
              currentPage === i
                ? "bg-lightGreen text-darkGreen"
                : " border border-lightGreen text-lightGreen"
            )}
          >
            {i}
          </button>
        );
      }
    } else if (currentPage <= 3) {
      // Beginning: 1 2 3 ... last
      for (let i = 1; i <= 3; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={classNames(
              "mx-1 rounded-full px-4 py-2",
              currentPage === i
                ? "bg-lightGreen text-darkGreen"
                : "border border-lightGreen text-lightGreen"
            )}
          >
            {i}
          </button>
        );
      }
      pageNumbers.push(
        <span key="ellipsis" className="mx-1 px-2 text-lightGreen">
          ...
        </span>
      );
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={classNames(
            "mx-1 rounded-full border border-lightGreen py-2 text-lightGreen",
            totalPages > 9 ? "px-3" : "px-4"
          )}
        >
          {totalPages}
        </button>
      );
    } else if (currentPage >= totalPages - 2) {
      // End: 1 ... last-2 last-1 last
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="mx-1 rounded-full border border-lightGreen px-4 py-2 text-lightGreen"
        >
          1
        </button>
      );
      pageNumbers.push(
        <span key="ellipsis" className="mx-1 px-2 text-lightGreen">
          ...
        </span>
      );
      for (let i = totalPages - 2; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={classNames(
              "mx-1 rounded-full py-2",
              currentPage === i
                ? "bg-lightGreen text-darkGreen"
                : "border border-lightGreen text-lightGreen",
              i > 9 ? "px-3" : "px-4"
            )}
          >
            {i}
          </button>
        );
      }
    } else {
      // Middle: 1 ... x ... last
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="mx-1 rounded-full border border-lightGreen px-4 py-2 text-lightGreen"
        >
          1
        </button>
      );
      pageNumbers.push(
        <span key="ellipsis1" className="mx-1 px-2 text-lightGreen">
          ...
        </span>
      );
      pageNumbers.push(
        <button
          key={currentPage}
          onClick={() => handlePageChange(currentPage)}
          className={classNames(
            "mx-1 rounded-full border border-lightGreen bg-lightGreen py-2 text-darkGreen",
            currentPage > 9 ? "px-3" : "px-4"
          )}
        >
          {currentPage}
        </button>
      );
      pageNumbers.push(
        <span key="ellipsis2" className="mx-1 px-2 text-lightGreen">
          ...
        </span>
      );
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={classNames(
            "mx-1 rounded-full border border-lightGreen py-2 text-lightGreen",
            totalPages > 9 ? "px-3" : "px-4"
          )}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
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
            <Listbox value={selectedOption} onChange={handleOptionChange}>
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
                          `relative cursor-pointer select-none py-2 pl-2 pr-4 text-lightGreen ${
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
            <NetworkSelection setNetwork={setNetwork} />
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
              Identifier{" "}
            </div>
            <div className="flex translate-x-2 cursor-pointer flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Bond
            </div>
            <div className="flex cursor-pointer flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Challenge Period
            </div>
          </div>
          {filteredAssessments.length > 0 ? (
            <>
              {paginatedComponents.map((element, index) => (
                <Assessment
                  assessment={element}
                  key={index}
                  loading={loading}
                  onClick={() => handleAssessmentClick(element)}
                />
              ))}
              {filteredAssessments.length > ITEMS_PER_PAGE && (
                <div className="mt-4 flex items-center justify-center">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="mx-1 rounded px-3 py-1 text-lightGreen disabled:opacity-20"
                  >
                    &lt;
                  </button>
                  {renderPageNumbers()}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="mx-1 rounded px-3 py-1 text-lightGreen disabled:opacity-20"
                  >
                    &gt;
                  </button>
                </div>
              )}
            </>
          ) : (
            <div></div>
          )}
          {/* {!loading && (
    filteredValue
      ? filteredAssessments.map((assessment, assetIdx) => (
        <div
          key={assetIdx}
          onClick={() => handleAssessmentClick(assessment)}
          className="cursor-pointer"
        >
        </div>
      ))
    : assessments.map((assessment, assetIdx) => (
        <div
          key={assetIdx}
          onClick={() => handleAssessmentClick(assessment)}
          className="cursor-pointer"
        >
        </div>
      ))
)} */}
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
          network={network}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};

export default ActiveAssessments;
