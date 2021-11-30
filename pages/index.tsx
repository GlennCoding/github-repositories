import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import PaginationMenu from "../components/PaginationMenu";
import fetchRepositories from "../data/fetchRepositories";
import useOrganisation from "../data/useOrganisation";
import { checkHasMore } from "../utils/checkHasMore";
import Repository from "../components/Repository";
import SearchBar from "../components/SearchBar";

const ORG: string = "laravel";

const Home: NextPage = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);

  const { data: organisation } = useOrganisation(ORG);
  const {
    status,
    data: repositories,
    error,
    isFetching,
    isPreviousData,
  } = useQuery(["repositories", page], () => fetchRepositories(ORG, page), {
    keepPreviousData: true,
  });

  const numberOfRepos = organisation && organisation["public_repos"];
  const hasMore = useMemo(
    () => checkHasMore(numberOfRepos, page),
    [numberOfRepos, page]
  );

  useEffect(() => {
    if (hasMore) {
      fetchRepositories(ORG, page + 1);
    }
  }, [hasMore, organisation, repositories, page, queryClient]);

  return (
    <div className="container mx-auto px-4 py-10">
      <SearchBar />

      {repositories && (
        <div className="mb-10 rounded-md border border-gray-300 divide-y">
          {repositories.map((repo: any) => (
            <div key={repo.id}>
              <Repository repo={repo} />
            </div>
          ))}
        </div>
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
