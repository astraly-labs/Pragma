import { DownOutlined, UpOutlined } from "@ant-design/icons";
import classNames from "classnames";
import React, { useState } from "react";
import { AssetKeys, AssetKeyT } from "../hooks/oracle";

const AssetKeyPicker = ({
  selectedAssetKey,
  onKeyChange,
}: {
  selectedAssetKey: AssetKeyT;
  onKeyChange: (newKey: AssetKeyT) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const dropdown = (
    <div className="absolute inset-x-0 my-2">
      <div className="bg-white m-auto w-36 rounded-md py-1">
        {AssetKeys.map((key, i) => (
          <div
            className={classNames(
              "py-1 text-indigo-600 hover:text-indigo-900 hover:bg-fuchsia-100",
              { "border-t border-top border-gray-300": i !== 0 }
            )}
            key={key}
            onClick={() => onKeyChange(key)}
          >
            {key.toLocaleUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );

  const dropdownIconClassName = "text-sm align-middle mb-1";
  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className="cursor-pointer my-4"
    >
      {selectedAssetKey.toLocaleUpperCase()}{" "}
      {isExpanded ? (
        <UpOutlined className={dropdownIconClassName} />
      ) : (
        <DownOutlined className={dropdownIconClassName} />
      )}
      {isExpanded && dropdown}
    </div>
  );
};

export default AssetKeyPicker;
