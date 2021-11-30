import { XIcon, CheckIcon } from "@primer/octicons-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import useOutsideClickDetector from "../../hooks/useOnOutsideClickDetector";
import { REPOSITORY_TYPES } from "../../utils/constants/repositories";
import { capitalizeFirstLetter } from "../../utils/formatting";
import { RepositoryType } from "../../utils/types";
import styles from "./FilterDropdown.module.css";

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
        <div className={styles.DropdownBody} ref={ref}>
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
        </div>
      </div>
    </>
  );
};
export default FilterDropdown;
