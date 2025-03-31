"use client";

import { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "@/components/Assets/styles.module.scss";
import sharedStyles from "@/pages/styles.module.scss";
import CheckpointComp from "@/components/Assets/CheckpointComp";

const ITEMS_PER_PAGE = 10;

export const Checkpoints = ({ components }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedComponents, setPaginatedComponents] = useState([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedComponents(components.slice(startIndex, endIndex));
  }, [currentPage, components]);

  const totalPages = Math.ceil(components.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  const renderPageNumbers = () => {
    const pageNumbers: any[] = [];

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
    <div
      className={classNames(
        "z-1 w-full flex-col justify-between gap-0",
        sharedStyles.greenBox
      )}
    >
      <h4 className="text-lightGreen">Checkpoints</h4>
      <div className="w-full overflow-x-scroll">
        <div className={styles.priceComp}>
          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Hash
          </div>
          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Price
          </div>
          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Date
          </div>
          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Hour
          </div>
          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Signer
          </div>
        </div>
        {components.length > 0 ? (
          <>
            {paginatedComponents.map((component, index) => (
              <CheckpointComp key={index} component={component} />
            ))}
            {components.length > ITEMS_PER_PAGE && (
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
          <div className="pt-4 font-mono tracking-wider text-lightGreen">
            No checkpoints on this pair
          </div>
        )}
      </div>
    </div>
  );
};
