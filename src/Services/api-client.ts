const API_KEY = import.meta.env.VITE_RAPID_API_YAHOO_API_KEY;
const API_HOST = import.meta.env.VITE_RAPID_API_HOST;

export const fetchData = async (end_point: string) => {
  const url = `https://yahoo-finance15.p.rapidapi.com/api/${end_point}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    // const data = JSON.parse(result);
    return result.body;
  } catch (error) {
    console.error(error);
  }
};
