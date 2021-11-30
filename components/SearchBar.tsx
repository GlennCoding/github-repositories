import { SearchIcon } from "@primer/octicons-react";

interface SearchBarProps {
  searchInput: string;
  updateSearchInput: (input: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchInput,
  updateSearchInput,
}) => {
  return (
    <div className="relative">
      <SearchIcon
        size={16}
        className="text-gray-500 mr-2 absolute top-2 left-2"
      />
      <input
        value={searchInput}
        type="text"
        className="text-sm w-full focus:outline-none focus:ring-2 focus:border-blue-200 group flex py-1.5 pr-2 pl-7 border-gray-300 border rounded-md items-center placeholder-gray-500"
        placeholder="Find a repository..."
        onChange={(e) => updateSearchInput(e.target.value)}
      />
    </div>
  );
};
export default SearchBar;
