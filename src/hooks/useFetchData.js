import { useState } from "react";

export const useFetchData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (endpoint, obj) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/${endpoint}?limit=${obj.limit}&skip=${obj.skip}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      return result;
    } catch (err) {
      setError(err);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchData, isLoading, error };
};
