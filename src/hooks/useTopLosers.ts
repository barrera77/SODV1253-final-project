import { useState, useEffect } from "react";
import { Stock } from "../constants";
import { fetchData } from "../services";

const LOSERS_END_POINT = "v1/markets/screener?list=day_losers";

export const useTopLosers = () => {
  const [data, setData] = useState<Stock[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchTopLosers = async () => {
      try {
        const result: Stock[] = await fetchData(LOSERS_END_POINT);
        if (!result || result.length === 0) {
          setError("No losers data available");
        } else {
          setData(result);
        }
      } catch {
        setError("Failed to fetch losers");
        setData([]);
      }
    };

    fetchTopLosers();
  }, []);

  return { data, error };
};
