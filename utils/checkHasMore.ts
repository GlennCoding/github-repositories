import { OrganisationDTO } from "./types";

export function checkHasMore(
  organisation: OrganisationDTO | undefined,
  currentPage: number
): boolean {
  if (organisation) {
    return organisation["public_repos"] > currentPage * 30;
  }
  return false;
}
