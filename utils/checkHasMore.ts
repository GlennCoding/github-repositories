export function checkHasMore(organisation: any, currentPage: number): boolean {
  if (organisation) {
    return organisation["public_repos"] > currentPage * 30;
  }
  return false;
}
