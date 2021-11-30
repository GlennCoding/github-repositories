import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import PaginationMenu from "../components/PaginationMenu";
import fetchRepositories from "../data/fetchRepositories";
import useOrganisation from "../data/useOrganisation";
import { checkHasMore } from "../utils/checkHasMore";
import { getNumberOfDaysInBetween } from "../utils/formatting";
import {
  LawIcon,
  RepoForkedIcon,
  StarIcon,
  IssueOpenedIcon,
  GitPullRequestIcon,
} from "@primer/octicons-react";

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
      {repositories && (
        <div>
          {repositories.map((repo: any) => {
            const {
              id,
              name,
              private: private_visibility,
              topics,
              language,
              licence,
              description,
              forks_count,
              stargazers_count,
              updated_at,
              html_url,
            } = repo;
            return (
              <div
                key={id}
                className="mb-10 p-4 rounded-md border border-gray-300"
              >
                <div className="flex items-center">
                  <a href={html_url}>
                    <h3 className="text-xl font-semibold mr-2 text-blue-600 hover:underline">
                      {name}
                    </h3>
                  </a>
                  <span className="text-xs font-medium border border-gray-300 px-2 py-0.5 rounded-full text-gray-600">
                    {private_visibility ? "Private" : "Public"}
                  </span>
                </div>
                {description && (
                  <span className="text-gray-600 text-sm">{description}</span>
                )}
                <div className="flex">
                  {topics.map((topic: any, i: number) => (
                    <div
                      key={i}
                      className="bg-blue-100 rounded-full px-2 py-1 text-xs font-medium text-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white mr-1 my-1"
                    >
                      {topic}
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-sm space-x-3 text-gray-500 flex">
                  {language && (
                    <div className="flex items-center">
                      <div className="rounded-full h-3 w-3 bg-indigo-600 mr-1" />
                      {language}
                    </div>
                  )}
                  {licence && (
                    <div>
                      <LawIcon size={16} />
                      {licence}
                    </div>
                  )}
                  <div className="hover:text-blue-600">
                    <RepoForkedIcon size={16} />
                    {forks_count}
                  </div>
                  <div className="hover:text-blue-600">
                    <StarIcon size={16} />
                    {stargazers_count}
                  </div>
                  {/* Have to fetch pulls number */}
                  <span>
                    Updated {getNumberOfDaysInBetween(updated_at, new Date())}{" "}
                    days ago
                  </span>
                </div>
              </div>
            );
          })}
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
