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
import { RepositoryType } from "../utils/types";
import FilterDropdown from "../components/FilterDropdown/FilterDropdown";
import { REPOSITORY_TYPES } from "../utils/constants/repositories";

const ORG: string = "laravel";

const Home: NextPage = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);
  const [searchInput, setSearchInput] = useState<string>("");
  const [repositories, setRepositories] = useState([]);
  const [selectedType, setSelectedType] = useState<RepositoryType>("all");
  const [showTypeFilter, setShowTypeFilter] = useState<boolean>(false);

  const { data: organisation } = useOrganisation(ORG);
  const {
    data: fetchedRepositories,
    isFetching,
    isPreviousData,
  } = useQuery(
    ["repositories", page, selectedType],
    () => fetchRepositories(ORG, page, selectedType),
    {
      keepPreviousData: true,
    }
  );

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
      fetchRepositories(ORG, page + 1, selectedType)
    );
  }, [repositories, page, queryClient, selectedType]);

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
          <div className="relative">
            <div
              onClick={() => setShowTypeFilter(true)}
              className="flex items-center py-1.5 px-4 rounded-md bg-gray-100 border-gray-300 border shadow-sm cursor-pointer"
            >
              <p className="mr-1 text-sm font-medium">Type</p>
              <Image src="/icons/caret.svg" height={4} width={8} alt="" />
            </div>
            {showTypeFilter && (
              <FilterDropdown
                title="Select Type"
                selectedType={selectedType}
                filterOptions={REPOSITORY_TYPES}
                onSelect={(filter) => {
                  setSelectedType(filter);
                  setShowTypeFilter(false);
                }}
                onClose={() => {
                  setShowTypeFilter(false);
                }}
              />
            )}
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

      <div className="flex justify-center">
        <PaginationMenu
          page={page}
          setPage={setPage}
          isPreviousData={isPreviousData}
          hasMore={hasMore}
        />
      </div>
    </div>
  );
};

export default Home;
