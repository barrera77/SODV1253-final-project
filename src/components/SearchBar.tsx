import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  //get the use input
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <form className="search-wrapper w-[100%]">
      <div className="relative w-[100%]">
        <input
          type="search"
          value={searchQuery}
          onChange={handleSearchInput}
          id="default-search"
          className="block w-[100%] bg-[#fff] p-4 sm:py-3 xl:ps-10 text-sm text-gray-900 border border-gray-300 sm:rounded-lg focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Search Stocks..."
          required
        />
        <button
          type="submit"
          className="btn xs:hidden xl:block btn-search focus:ring-[#0b022d] text-sm px-5 py-[.6em] "
        >
          Search
        </button>
        <button type="submit" className="btn-mobile-search xl:hidden">
          <FaSearch className="text-xl" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
