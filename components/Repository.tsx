import { LawIcon, RepoForkedIcon, StarIcon } from "@primer/octicons-react";
import { getNumberOfDaysInBetween } from "../utils/formatting";

interface RepositoryProps {
  repo: any;
}

const Repository: React.FC<RepositoryProps> = ({ repo }) => {
  const {
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
    <div className="p-4">
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
        <div className="hover:text-blue-600 cursor-pointer">
          <span className="mr-1">
            <RepoForkedIcon size={16} />
          </span>
          {forks_count}
        </div>
        <div className="hover:text-blue-600 cursor-pointer">
          <span className="mr-1">
            <StarIcon size={16} />
          </span>
          {stargazers_count}
        </div>
        {/* Have to fetch pulls number */}
        <span>
          Updated {getNumberOfDaysInBetween(updated_at, new Date())} days ago
        </span>
      </div>
    </div>
  );
};
export default Repository;
