import React, { useState, useEffect } from "react";
import { XIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { ClockIcon, InformationCircleIcon } from "@heroicons/react/outline";

interface AssessmentPopupProps {
  assessment: any; // Replace 'any' with your actual Assessment type
  onClose: () => void;
}

const AssessmentPopup: React.FC<AssessmentPopupProps> = ({
  assessment,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateProgressAndTime = () => {
      const start = assessment.startDispute * 1000; // Convert to milliseconds
      const end = assessment.endDispute * 1000; // Convert to milliseconds
      const now = Date.now();
      const total = end - start;
      const current = now - start;
      const calculatedProgress = Math.min(
        Math.max((current / total) * 100, 0),
        100
      );
      setProgress(calculatedProgress);

      // Calculate time left
      const remaining = end - now;
      if (remaining > 0) {
        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (remaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeLeft("Ended");
      }
    };

    updateProgressAndTime();
    const timer = setInterval(updateProgressAndTime, 1000); // Update every second

    return () => clearInterval(timer);
  }, [assessment]);

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  useEffect(() => {
    // Trigger the animation after the component is mounted
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for the animation to finish before calling onClose
  };

  return (
    <div className="fixed bottom-0 left-0 z-50 w-screen">
      <div
        className={`transform bg-darkGreen text-lightGreen shadow-lg transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <div className="sticky top-0 mb-4 flex	 items-center justify-between bg-lightBlur px-10 py-4 backdrop-blur">
          <div className="flex flex-row gap-3">
            <Image width={25} height={25} alt="Logo" src={assessment.image} />
            <h3 className="text-xl font-bold">{assessment.title}</h3>
          </div>
          <button
            onClick={handleClose}
            className="rounded-full border border-lightGreen p-2 text-lightGreen hover:bg-lightGreen hover:text-darkGreen"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4  px-10 pb-5">
          <div className="flex flex-row gap-3">
            <InformationCircleIcon className=" my-auto h-6 w-6 rounded-full text-lightGreen" />
            <h5>Assertion</h5>
          </div>
          <p>
            <div className="text-mint">Description</div>{" "}
            {assessment.description}
          </p>
          <p>
            <div className="text-mint">Challenge period ends</div>{" "}
            {assessment.endDispute}
          </p>
          <p>
            <div className="text-mint">Result</div> {assessment.output}
          </p>
          <p>
            <div className="text-mint">Bond</div> {assessment.bond}
          </p>
          <div className="flex flex-row gap-3">
            <ClockIcon className=" my-auto h-6 w-6 rounded-full text-lightGreen" />
            <h5>Timeline</h5>
          </div>
          <p>
            <div className="text-mint">Start challenge period</div>{" "}
            {assessment.startDispute}
          </p>
          <p>
            <div className="text-mint">End challenge period</div>{" "}
            {assessment.endDispute}
          </p>
          <>
            <div className="h-1 w-40 rounded-full bg-lightBlur">
              <div
                className="h-1 rounded-full bg-mint transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="mt-1 text-xs">Left: {timeLeft}</div>
          </>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPopup;
