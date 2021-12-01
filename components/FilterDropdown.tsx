import { XIcon, CheckIcon } from "@primer/octicons-react";
import { useRef } from "react";
import useOutsideClickDetector from "../hooks/useOnOutsideClickDetector";
import { capitalizeFirstLetter } from "../utils/formatting";
import { motion } from "framer-motion";

interface FilterDropdownProps<T> {
  selectedType: string;
  title: string;
  filterOptions: T[];
  onClose: () => void;
  onSelect: (filter: T) => void;
}

const FilterDropdown = <T extends unknown>({
  selectedType,
  title,
  filterOptions,
  onClose,
  onSelect,
}: FilterDropdownProps<T>) => {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClickDetector(ref, () => onClose());

  return (
    <>
      <div className="fixed inset-0 sm:opacity-0 bg-black opacity-40" />
      <div className="fixed flex inset-0 justify-center items-center sm:block sm:inset-auto sm:static">
        <motion.div
          className="w-full mx-4 text-sm rounded-lg sm:mx-0 sm:transform-none sm:absolute sm:top-10 sm:left-0 sm:right-auto sm:bottom-auto xl:left-auto xl:right-0 sm:text-xs bg-white sm:w-72 border-gray-300 border sm:rounded-md shadow-md"
          ref={ref}
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 100 }}
          transition={{ ease: "easeInOut", duration: 0.1 }}
        >
          <div className="p-4 sm:pr-2 sm:py-2 flex justify-between items-center border-b">
            <p className="font-medium">{title}</p>
            <div onClick={onClose}>
              <XIcon
                size={16}
                className="text-gray-500 hover:text-black cursor-pointer"
              />
            </div>
          </div>
          <ol className="list-none divide-y">
            {filterOptions.map((filter, i) => {
              return (
                <li
                  key={i}
                  className="py-4 px-4 sm:py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onSelect(filter);
                  }}
                >
                  <p>
                    <CheckIcon
                      size={16}
                      className={`mr-3 ${
                        filter !== selectedType && "invisible"
                      }`}
                    />
                    {capitalizeFirstLetter(filter as string)}
                  </p>
                </li>
              );
            })}
          </ol>
        </motion.div>
      </div>
    </>
  );
};
export default FilterDropdown;
