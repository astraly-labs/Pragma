import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Dialog, Combobox, Transition } from "@headlessui/react";

import { AssetKeys } from "../hooks/oracle";
import { ChevronRightIcon, SearchIcon } from "@heroicons/react/outline";
import AssetCardName from "./Asset/AssetCardName";

const CommandPallate: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    /**
     * Listens for shortcut to open command pallete.
     * @param {KeyboardEvent} event keydown event
     */
    function onKeydown(event) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        // AFAIK (isOpen) => !isOpen instead of !isOpen allows us to remove isOpen from the dependency array.
        // This prevents us from mounting and unmounting the event listeners on every render.
        setIsOpen((isOpen) => !isOpen);
      }
    }
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, []);

  const filteredAssets = query
    ? AssetKeys.filter((asset) =>
        asset.toLowerCase().includes(query.toLowerCase())
      )
    : [];
  return (
    <Transition.Root
      show={isOpen}
      as={React.Fragment}
      afterLeave={() => setQuery("")}
    >
      <Dialog
        onClose={setIsOpen}
        className="fixed inset-0 overflow-y-auto p-4 pt-[25vh]"
      >
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-slate-700/75" />
        </Transition.Child>
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="scale-95 opacity-0"
          enterTo="scale-100 opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-95 opacity-0"
        >
          <Combobox
            value={null}
            onChange={(value) => {
              setIsOpen(false);
              // TODO: navigate user
              console.log(value);
            }}
            as="div"
            className="relative mx-auto max-w-3xl divide-y divide-slate-50 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-slate-900/5"
          >
            <div className="flex items-center space-x-4 px-4 py-2">
              <SearchIcon className="h-6 w-6 text-slate-500" />
              <Combobox.Input
                onChange={(event) => setQuery(event.target.value)}
                className="h-12 w-full appearance-none border-0 bg-transparent text-xl text-slate-900 placeholder-slate-400 outline-none focus:ring-0"
                placeholder="eth/usd"
              />
            </div>
            {filteredAssets.length > 0 && (
              <Combobox.Options
                static
                className="max-h-96 overflow-y-auto py-4"
              >
                {filteredAssets.map((assetKey) => (
                  <Combobox.Option key={assetKey} value={assetKey}>
                    {({ active }) => (
                      <div
                        className={classNames(
                          "flex items-center justify-between p-4",
                          {
                            "bg-slate-300": active,
                          }
                        )}
                      >
                        <AssetCardName assetKey={assetKey} />
                        {active && (
                          <ChevronRightIcon className="h-6 w-6 text-gray-900" />
                        )}
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
            {query && filteredAssets.length === 0 && (
              <p className="p-4 text-slate-500">No matching asset found</p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default CommandPallate;
