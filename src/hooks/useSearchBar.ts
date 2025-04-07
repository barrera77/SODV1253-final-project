import { ChangeEvent, useState } from "react";
type UseSearchBarProps = {
  searchQuery: string;
  handleSearchInput: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const useSearchBar = (): UseSearchBarProps => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  //get the user input
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  return {
    searchQuery,
    handleSearchInput,
  };
};
