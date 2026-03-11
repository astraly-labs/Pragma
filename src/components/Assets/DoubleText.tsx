import React from "react";

const DoubleText = ({ bigText, smolText }) => {
  return (
    <div className={"flex flex-col"}>
      <div className="text-xs tracking-wider text-lightGreen sm:text-lg tabular-nums w-[200px] text-ellipsis">
        {bigText}
      </div>
      <div className="font-mono text-xs tracking-wider text-LightGreenFooter sm:text-sm">
        {smolText}
      </div>
    </div>
  );
};

export default DoubleText;
