import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../Services/api-client";

interface StockDetails {
  shortName: string;
  symbol: string;
  quoteSourceName: string;
  fullExchangeName: string;
  currency: string;
  regularMarketVolume: number;
  averageDailyVolume3Month: number;
  regularMarketPreviousClose: number;
  marketCap: number;
  fiftyTwoWeekLow: number;
}

const StockDetailsPage = () => {
  const [stockDetails, setStockDetails] = useState<StockDetails | null>(null);
  const [error, setError] = useState("");

  const { symbol } = useParams();

  const getstockDetails = async () => {
    if (!symbol) {
      return;
    }

    const data = await fetchData(`yahoo/qu/quote/${symbol}`);

    if (!data || data.length === 0) {
      setError("No data available");
      return;
    }
    console.log("details: ", data[0]);
    setStockDetails(data[0]);
  };

  useEffect(() => {
    getstockDetails();
  }, [symbol]);

  return (
    <div className="w-full">
      <div className="container m-auto">
        <div className="border-b border-slate-200 py-3">
          <h2 className="text-start font-semibold">
            {stockDetails?.shortName} ({stockDetails?.symbol})
          </h2>
          <div className="flex gap-3 text-start text-[13px] items-center">
            <span>{stockDetails?.fullExchangeName}</span>-
            <span>{stockDetails?.quoteSourceName}</span>•
            <span>{stockDetails?.currency}</span>
          </div>
        </div>
        <div>
          <div>
            <div className="flex justify-between">
              <span>Share Volume</span>
              <span>{stockDetails?.regularMarketVolume}</span>
            </div>
            <div className="flex justify-between">
              <span>Average Volume</span>
              <span>{stockDetails?.averageDailyVolume3Month}</span>
            </div>
            <div className="flex justify-between">
              <span>Previous Close</span>
              <span>${stockDetails?.regularMarketPreviousClose}</span>
            </div>
            <div className="flex justify-between">
              <span>52 Week High/Low</span>
              <span>${stockDetails?.fiftyTwoWeekLow}</span>
            </div>
            <div className="flex justify-between">
              <span></span>
              <span></span>
            </div>
            <div className="flex justify-between">
              <span></span>
              <span></span>
            </div>
            <div className="flex justify-between">
              <span></span>
              <span></span>
            </div>
            <div className="flex justify-between">
              <span></span>
              <span></span>
            </div>
            <div className="flex justify-between">
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetailsPage;
