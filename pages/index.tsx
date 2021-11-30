import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import PaginationMenu from "../components/PaginationMenu";
import fetchRepositories from "../data/fetchRepositories";
import useOrganisation from "../data/useOrganisation";
import { checkHasMore } from "../utils/checkHasMore";
import Repository from "../components/Repository";
import SearchBar from "../components/SearchBar";
import { XIcon, CheckIcon } from "@primer/octicons-react";

const ORG: string = "laravel";

const Home: NextPage = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);
  const [searchInput, setSearchInput] = useState<string>("");
  const [repositories, setRepositories] = useState([]);

  const { data: organisation } = useOrganisation(ORG);
  const {
    data: fetchedRepositories,
    isFetching,
    isPreviousData,
  } = useQuery(["repositories", page], () => fetchRepositories(ORG, page), {
    keepPreviousData: true,
  });

  useEffect(() => {
    setRepositories(fetchedRepositories);
  }, [fetchedRepositories]);

  const updateSearchInput = (input: string) => {
    const filtered = fetchedRepositories.filter((repo: any) => {
      return repo.name.toLowerCase().includes(input.toLowerCase());
    });
    setSearchInput(input);
    setRepositories(filtered);
  };

  const numberOfRepos = organisation && organisation["public_repos"];
  const hasMore = useMemo(
    () => checkHasMore(numberOfRepos, page),
    [numberOfRepos, page]
  );

  useEffect(() => {
    queryClient.prefetchQuery(["projects", page + 1], () =>
      fetchRepositories(ORG, page + 1)
    );
  }, [repositories, page, queryClient]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex xl:space-x-4 xl:flex-row mb-4 flex-col space-x-0">
        <div className="xl:w-5/12 xl:mb-0 md:w-8/12 w-full mb-2 ">
          <SearchBar
            searchInput={searchInput}
            updateSearchInput={updateSearchInput}
          />
        </div>
        <div className="flex">
          <div className="flex items-center py-1.5 px-4 rounded-md bg-gray-100 border-gray-300 border shadow-sm cursor-pointer relative">
            <p className="mr-1 text-sm font-medium">Language</p>
            <Image src="/icons/caret.svg" height={4} width={8} alt="" />
            {/* DROPDOWN */}
            <div className="absolute xl:right-0 xl:left-auto left-0 top-10 text-xs bg-white w-72 border-gray-300 border rounded-md shadow-md">
              <div className="pl-4 pr-2 py-2 flex justify-between items-center border-b">
                <p className="font-medium">Select Language</p>
                <XIcon size={16} className="text-gray-500 hover:text-black" />
              </div>
              <ol className="list-none divide-y">
                <li className="px-4 py-2">
                  <p>
                    <CheckIcon size={16} className="mr-3" />
                    All
                  </p>
                </li>
                <li className="px-4 py-2">
                  <p>
                    <CheckIcon size={16} className="mr-3 invisible" />
                    All
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {repositories && (
        <ul className="mb-10 rounded-md border border-gray-300 divide-y">
          {repositories.map((repo: any) => (
            <li key={repo.id}>
              <Repository repo={repo} />
            </li>
          ))}
        </ul>
      )}

      <PaginationMenu
        page={page}
        setPage={setPage}
        isFetching={isFetching}
        isPreviousData={isPreviousData}
        hasMore={hasMore}
      />
    </div>
  );
};

export default Home;
