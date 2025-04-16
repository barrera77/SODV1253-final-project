import { ChangeEvent, useState } from "react";
import { SearchItem } from "../constants";
import { fetchData } from "../services";

type UseSearchBarProps = {
  searchQuery: string;
  handleSearchInput: (event: ChangeEvent<HTMLInputElement>) => void;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  getSearchResults: (event: React.FormEvent) => Promise<void>;
  searchResults: SearchItem[];
  error: string;
};

export const useSearchBar = (): UseSearchBarProps => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [error, setError] = useState<string>("");

  // Get user input
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  console.log("setSearchQuery: "), searchQuery;
  // Fetch search results
  const getSearchResults = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form submission

    if (!searchQuery.trim()) {
      return;
    }

    try {
      const data: SearchItem[] = await fetchData(
        `v1/markets/search?search=${searchQuery}`
      );
      if (!Array.isArray(data)) {
        setError("No search results found");
        setSearchResults([]);
        return;
      }
      setSearchResults(data);
      setError(""); // Clear any errors
    } catch {
      setError("Failed to fetch search results");
      setSearchResults([]);
    }
  };

  return {
    searchQuery,
    handleSearchInput,
    setSearchQuery,
    searchResults,
    getSearchResults,
    error,
  };
};
