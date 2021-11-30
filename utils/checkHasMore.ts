export function checkHasMore(
  numberOfRepos: number,
  currentPage: number
): boolean {
  return numberOfRepos > currentPage * 30;
}
