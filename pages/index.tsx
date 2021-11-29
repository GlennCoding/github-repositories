import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

const ORG: string = "laravel";

async function fetchRepositories(org: string, page: number) {
  const { data } = await axios.get(
    `https://api.github.com/orgs/${org}/repos?page=${page}`
  );
  return data;
}

const Home: NextPage = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);

  const { status, data, error, isFetching, isPreviousData } = useQuery(
    ["repositories", page],
    () => fetchRepositories(ORG, page),
    { keepPreviousData: true }
  );

  useEffect(() => {
    if (data?.hasMore) {
      fetchRepositories(ORG, page + 1);
    }
  }, [data, page, queryClient]);

  console.log(data && data?.hasMore);

  return (
    <div>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "error" ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.map((repository: any) => (
            <p key={repository.id}>{repository.name}</p>
          ))}
        </div>
      )}
      <div>Current Page: {page}</div>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 1}
      >
        Previous Page
      </button>{" "}
      <button
        onClick={() => {
          setPage((old) => (data?.hasMore ? old + 1 : old));
        }}
        disabled={isPreviousData || !data?.hasMore}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}{" "}
    </div>
  );
};

export default Home;
