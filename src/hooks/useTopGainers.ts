import { useState, useEffect } from "react";
import { Stock } from "../constants";
import { fetchData } from "../Services";

const GAINERS_END_POINT = "v1/markets/screener?list=day_gainers";

export const useTopGainers = () => {
  const [data, setData] = useState<Stock[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchTopGainers = async () => {
      try {
        const result: Stock[] = await fetchData(GAINERS_END_POINT);
        if (!result || result.length === 0) {
          setError("No gainers data available");
        } else {
          setData(result);
        }
      } catch {
        setError("Failed to fetch gainers");
        setData([]);
      }
    };

    fetchTopGainers();
  }, []);

  return { data, error };
};
