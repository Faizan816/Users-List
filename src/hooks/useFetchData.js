export const useFetchData = () => {
  const fetchData = async (endpoint, obj) => {
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
      console.log(err);
    }
  };

  return { fetchData };
};
