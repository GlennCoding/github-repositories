import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import PaginationMenu from "../components/PaginationMenu";
import fetchRepositories from "../data/fetchRepositories";
import useOrganisation from "../data/useOrganisation";
import RepositoryCard from "../components/RepositoryCard";
import SearchBar from "../components/SearchBar";
import { RepositoryDTO, RepositoryType } from "../utils/types";
import FilterDropdown from "../components/FilterDropdown";
import { REPOSITORY_TYPES } from "../utils/constants/repositories";
import { RepoIcon } from "@primer/octicons-react";
import { QueryKeys } from "../utils/constants/cache";

const ORG: string = "laravel";

const Home: NextPage = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedType, setSelectedType] = useState<RepositoryType>("all");
  const [showTypeFilter, setShowTypeFilter] = useState<boolean>(false);

  const { data: organisation } = useOrganisation(ORG);
  const {
    data: repositories,
    isFetching,
    isPreviousData,
  } = useQuery<RepositoryDTO[]>(
    [QueryKeys.REPOSITORIES, page, selectedType],
    () => fetchRepositories(ORG, page, selectedType),
    {
      keepPreviousData: true,
    }
  );

  const hasMore = useMemo(() => {
    if (organisation) {
      return organisation["public_repos"] > page * 30;
    }
    return false;
  }, [organisation, page]);

  useEffect(() => {
    queryClient.prefetchQuery<RepositoryDTO[]>(
      [QueryKeys.REPOSITORIES, page + 1],
      () => fetchRepositories(ORG, page + 1, selectedType)
    );
  }, [repositories, page, queryClient, selectedType]);

  const filteredRepositories =
    repositories &&
    repositories.filter((repo: RepositoryDTO) =>
      repo.name.toLowerCase().includes(searchInput.toLowerCase())
    );

  return (
    <>
      <div className="bg-gray-100 border-b border-gray-300 mb-4">
        <div className="container mx-auto px-4 pt-10 pb-4">
          <div className="inline-block">
            <a
              href={organisation?.html_url}
              className="flex items-center"
              target="_blank"
              rel="noreferrer"
            >
              <div className="mr-2 bg-white border-gray-300 border w-8 h-8 flex justify-center items-center rounded-md">
                {organisation && (
                  <img
                    src="https://avatars.githubusercontent.com/u/958072?v=4"
                    alt=""
                    className="w-7 h-7 rounded-sm"
                  />
                )}
              </div>
              <h1 className="text-xl font-semibold">
                {organisation ? organisation.name : "Loading..."}
              </h1>
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mb-10">
        <div className="flex xl:space-x-4 xl:flex-row mb-4 flex-col space-x-0">
          <div className="xl:w-5/12 xl:mb-0 md:w-8/12 w-full mb-2 ">
            <SearchBar
              searchInput={searchInput}
              isFetching={isFetching}
              updateSearchInput={(input: string) => setSearchInput(input)}
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

        {filteredRepositories && filteredRepositories.length === 0 && (
          <div className="h-72 flex flex-col justify-center items-center border-b border-gray-300 p-8">
            <RepoIcon size={24} className="text-gray-600 mb-4 mx-2" />
            <h3 className="text-xl font-semibold text-center">
              This organization doesn’t have any repositories that match.
            </h3>
          </div>
        )}
        {filteredRepositories && filteredRepositories.length !== 0 && (
          <ul className="mb-10 rounded-md border border-gray-300 divide-y">
            {filteredRepositories.map((repo: RepositoryDTO) => {
              return (
                <li key={repo.id}>
                  <RepositoryCard repo={repo} />
                </li>
              );
            })}
          </ul>
        )}

        <div className="flex justify-center">
          {filteredRepositories &&
            filteredRepositories.length !== 0 &&
            searchInput.length < 1 &&
            selectedType === "all" && (
              <PaginationMenu
                page={page}
                setPage={setPage}
                isPreviousData={isPreviousData}
                hasMore={hasMore}
              />
            )}
        </div>
      </div>
    </>
  );
};

export default Home;
