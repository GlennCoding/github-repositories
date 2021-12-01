import { Dispatch, SetStateAction } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@primer/octicons-react";

interface PaginationMenuProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  isPreviousData: boolean;
  hasMore: boolean;
}

const PaginationMenu: React.FC<PaginationMenuProps> = ({
  page,
  setPage,
  isPreviousData,
  hasMore,
}) => {
  return (
    <div className="flex text-sm items-center">
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 1}
        className={`px-2 py-1 rounded-md cursor-pointer hover:border-gray-300 border-transparent border hover:border-current mx-2 ${
          page === 1 ? "text-gray-500" : "text-blue-600"
        }`}
      >
        <ChevronLeftIcon size={16} />
        Previous
      </button>
      <div className="bg-blue-600 rounded-lg w-8 h-8 text-white flex justify-center items-center ">
        {page}
      </div>
      <button
        disabled={isPreviousData || !hasMore}
        onClick={() => {
          setPage((old) => old + 1);
        }}
        className={`px-2 py-1 rounded-md cursor-pointer hover:border-gray-300 border-transparent border hover:border-current mx-2 ${
          !hasMore ? "text-gray-500" : "text-blue-600"
        }`}
      >
        Next
        <ChevronRightIcon size={16} />
      </button>
    </div>
  );
};
export default PaginationMenu;
