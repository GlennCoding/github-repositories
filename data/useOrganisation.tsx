import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { QueryKeys } from "../utils/constants/cache";
import { OrganisationDTO } from "../utils/types";

function useOrganisation(org: string): UseQueryResult<OrganisationDTO> {
  return useQuery<OrganisationDTO>(
    [QueryKeys.ORGANISATION, org],
    async () => {
      const { data } = await axios.get(`https://api.github.com/orgs/${org}`);
      return data;
    },
    { keepPreviousData: true, staleTime: 5000 }
  );
}

export default useOrganisation;
