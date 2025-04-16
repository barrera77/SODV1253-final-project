import { fetchData } from "../services";
import { MostActive } from "../constants";
import { useEffect, useState } from "react";

const MOST_ACTIVE_END_POINT = "v1/markets/options/most-active?type=STOCKS";

export const useMostActive = () => {
  const [data, setData] = useState<MostActive[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchMostActive = async () => {
      try {
        const result: MostActive[] = await fetchData(MOST_ACTIVE_END_POINT);
        if (!result || result.length === 0) {
          setError("No most active data available");
        } else {
          setData(result);
        }
      } catch {
        setError("Failed to fetch most active stocks");
        setData([]);
      }
    };

    fetchMostActive();
  }, []);

  return { data, error };
};
