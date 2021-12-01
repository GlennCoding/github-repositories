export type RepositoryType =
  | "all"
  | "public"
  | "private"
  | "forks"
  | "sources"
  | "member"
  | "internal";

export type RepositoryDTO = {
  id: number;
  name: string;
  private: string;
  topics: string[];
  language: string;
  licence: string;
  description: string;
  forks_count: number;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
};

export type OrganisationDTO = {
  name: string;
  html_url: string;
  avatar_url: string;
  public_repos: number;
};
