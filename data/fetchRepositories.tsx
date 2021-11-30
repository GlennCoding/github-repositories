import axios from "axios";
import { RepositoryType } from "../utils/types";
async function fetchRepositories(
  org: string,
  page: number,
  type: RepositoryType
) {
  const { data } = await axios.get(
    `https://api.github.com/orgs/${org}/repos?page=${page}&per_page=30&type=${type}`
  );
  return data;
}

export default fetchRepositories;
