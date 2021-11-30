import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

function useOrganisation(org: string): UseQueryResult<any, unknown> {
  return useQuery(
    ["repositories", org],
    async () => {
      const { data } = await axios.get(`https://api.github.com/orgs/${org}`);
      return data;
    },
    { keepPreviousData: true, staleTime: 5000 }
  );
}

export default useOrganisation;
