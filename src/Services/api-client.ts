const API_KEY = import.meta.env.VITE_RAPID_API_YAHOO_API_KEY;
const API_HOST = import.meta.env.VITE_RAPID_API_HOST;
const API_HOST_2 = import.meta.env.VITE_RAPID_API_HOST_YAHOO_REAL_TIME;

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

    return result.body;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDataInRealTime = async (end_point: string) => {
  const url = `https://yahoo-finance-real-time1.p.rapidapi.com/news/${end_point}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST_2,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    return result.g0.data.stream_items;
  } catch (error) {
    console.error(error);
  }
};
