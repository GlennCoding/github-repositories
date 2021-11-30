import axios from "axios";

async function fetchRepositories(org: string, page: number) {
  const { data } = await axios.get(
    `https://api.github.com/orgs/${org}/repos?page=${page}&per_page=1`
  );
  return data;
}

export default fetchRepositories;
