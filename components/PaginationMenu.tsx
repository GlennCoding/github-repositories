import { Dispatch, SetStateAction } from "react";

interface PaginationMenuProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  isFetching: boolean;
  isPreviousData: boolean;
  hasMore: boolean;
}

const PaginationMenu: React.FC<PaginationMenuProps> = ({
  page,
  setPage,
  isPreviousData,
  hasMore,
  isFetching,
}) => {
  return (
    <>
      <div>Current Page: {page}</div>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 1}
      >
        Previous Page
      </button>{" "}
      <button
        onClick={() => {
          setPage((old) => old + 1);
        }}
        disabled={isPreviousData || !hasMore}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}
    </>
  );
};
export default PaginationMenu;
