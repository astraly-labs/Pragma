import React, { useState, useEffect } from "react";
import { XIcon } from "@heroicons/react/solid";

interface AssessmentPopupProps {
  assessment: any; // Replace 'any' with your actual Assessment type
  onClose: () => void;
}

const AssessmentPopup: React.FC<AssessmentPopupProps> = ({
  assessment,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation after the component is mounted
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for the animation to finish before calling onClose
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div
        className={`transform rounded-t-lg bg-darkGreen p-6 text-lightGreen shadow-lg transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{assessment.title}</h2>
          <button
            onClick={handleClose}
            className="text-lightGreen hover:text-lightGreen/80"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-4">
          <p>
            <strong>Description:</strong> {assessment.description}
          </p>
          <p>
            <strong>Timestamp:</strong> {assessment.timestamp}
          </p>
          <p>
            <strong>Output:</strong> {assessment.output}
          </p>
          <p>
            <strong>Bond:</strong> {assessment.bond}
          </p>
          <p>
            <strong>Start Dispute:</strong> {assessment.startDispute}
          </p>
          <p>
            <strong>End Dispute:</strong> {assessment.endDispute}
          </p>
          {/* Add more assessment details as needed */}
        </div>
      </div>
    </div>
  );
};

export default AssessmentPopup;
