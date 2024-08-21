import React, { useMemo, useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import SearchBar from "../Navigation/SearchBar";
import AssessmentPopup from "./AssessmentPopup";
import Assessment from "./Assessment";

const ActiveAssessments = ({ assessments, loading }) => {
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
        <h3 className="pb-3 text-lightGreen">Active Assessments</h3>
        <div className="flex w-full flex-col-reverse gap-3 py-3 sm:flex-row">
          <div className="flex flex-col gap-3 smolScreen:flex-row">
            <div className="my-auto flex w-full flex-row justify-center rounded-full border border-lightBlur py-3 px-6 text-center text-sm text-lightGreen md:w-auto">
              Nb active assessments: {filteredAssessments.length}
            </div>
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
