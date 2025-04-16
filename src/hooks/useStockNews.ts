import { useEffect, useMemo, useState } from "react";
import { fetchData } from "../services";
import { News } from "../constants";

const NEWS_END_POINT = "v2/markets/news?tickers=SAP&type=ALL";

export const useStockNews = () => {
  const [data, setData] = useState<News[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const result: News[] = await fetchData(NEWS_END_POINT);

        if (!result || result.length === 0) {
          setError("No news data available");
        } else {
          setData(result);
        }
      } catch {
        setError("Failed to fetch tickers");
        setData([]);
      }
    };
    fetchNews();
  }, []);

  const randomNews: News | null = useMemo(() => {
    if (data.length === 0) return null;
    const index = Math.floor(Math.random() * data.length);
    return data[index];
  }, [data]);

  return { data, error, randomNews };
};
