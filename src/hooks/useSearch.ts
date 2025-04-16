import { useState } from "react";
import { fetchData } from "../Services";
import { SearchItem } from "../constants";

type UseSearchProps = {
  getSearchResults: (event: React.FormEvent) => Promise<void>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchResults: SearchItem[];
  error: string;
};
export const useSearch = (): UseSearchProps => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [error, setError] = useState<string>("");

  const getSearchResults = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!searchQuery.trim()) return;

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
    } catch {
      setError("Failed to fetch search results");
      setSearchResults([]);
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    getSearchResults,
    error,
  };
};
