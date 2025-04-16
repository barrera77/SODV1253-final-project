import { fetchData } from "../Services";
import { Ticker } from "../constants";
import { useEffect, useState } from "react";

const TICKERS_END_POINT = "v2/markets/tickers?&type=STOCKS";

export const useTickers = () => {
  const [data, setData] = useState<Ticker[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const result: Ticker[] = await fetchData(TICKERS_END_POINT);

        if (!result || result.length === 0) {
          setError("No tickers data available");
        } else {
          setData(result);
        }
      } catch {
        setError("Failed to fetch tickers");
        setData([]);
      }
    };
    fetchTickers();
  }, []);

  return { data, error };
};
