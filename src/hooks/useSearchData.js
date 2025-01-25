import { useState } from "react";

export const useSearchData = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const searchData = async (query, obj) => {
    setIsSearching(true);
    setSearchError(null);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/search?q=${query}&limit=${obj.limit}&skip=${obj.skip}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      setSearchError(error);
      throw error;
    } finally {
      setIsSearching(false);
    }
  };

  return { searchData, isSearching, searchError };
};
