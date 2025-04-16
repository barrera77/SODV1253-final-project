import { useState, useEffect } from "react";
import { fetchData } from "../Services";
import { StockDetails } from "../constants";

export const useStockDetails = (symbol: string | undefined) => {
  const [stockDetails, setStockDetails] = useState<StockDetails | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getStockDetails = async () => {
      if (!symbol) {
        return;
      }

      const data = await fetchData(`yahoo/qu/quote/${symbol}`);

      if (!data || data.length === 0) {
        setError("No data available");
        return;
      }
      setStockDetails(data[0]);
    };

    getStockDetails();
  }, [symbol]);

  return { stockDetails, error };
};
