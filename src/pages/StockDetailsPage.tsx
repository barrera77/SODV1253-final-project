import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../Services/api-client";
import { FaArrowLeft, FaMoon, FaPlusCircle } from "react-icons/fa";
import TradingViewChart from "../components/TradingViewWidget";

interface StockDetails {
  shortName: string;
  symbol: string;
  quoteSourceName: string;
  fullExchangeName: string;
  currency: string;
  regularMarketVolume: number;
  averageDailyVolume3Month: number;
  regularMarketOpen: number;
  regularMarketPreviousClose: number;
  marketCap: number;
  fiftyTwoWeekLow: number;
  epsCurrentYear: number;
  forwardPE: number;
  dividendDate: number;
  postMarketPrice: number;
  postMarketChange: number;
  postMarketChangePercent: number;
  postMarketTime: number;
}

const StockDetailsPage = () => {
  const [stockDetails, setStockDetails] = useState<StockDetails | null>(null);
  const [error, setError] = useState("");

  const { symbol, exchDisp } = useParams<{
    symbol: string | undefined;
    exchDisp?: string | undefined;
  }>();

  const navigate = useNavigate();

  const formatTime = (epochTime?: number, timeZone?: string) => {
    if (!epochTime) {
      return "N/A";
    }

    return new Date(epochTime * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: timeZone || "America/New_York",
      timeZoneName: "short",
      hour12: true,
    });
  };

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
    <div className="w-full mt-[5%]">
      <div className="container m-auto">
        <div className="text-start mb-4">
          <button
            onClick={() => navigate(-1)}
            className="btn flex gap-2 items-center justify-center border border-[#0b022d] hover:bg-[#fff] bg-[#0b022d] hover:text-[#0b022d] text-[#fff]"
          >
            <FaArrowLeft />
            <span>Back to dashboard</span>
          </button>
        </div>
        <div className="border-b border-slate-200 py-3 flex gap-9">
          <div>
            <h2 className="text-start font-semibold text-2xl">
              {stockDetails?.shortName} ({stockDetails?.symbol})
            </h2>
            <div className="flex gap-3 text-start text-[13px] items-center">
              <span>{stockDetails?.fullExchangeName}</span>-
              <span>{stockDetails?.quoteSourceName}</span>•
              <span>{stockDetails?.currency}</span>
            </div>
          </div>
          <button className="btn flex gap-3">
            <FaPlusCircle className="text-2xl" />
            Add
          </button>
        </div>
        <div>
          <div>
            <div className="flex gap-3 mt-3 font-semibold items-center">
              <span>{stockDetails?.postMarketPrice}</span>
              <span
                className={`base-class ${
                  stockDetails?.postMarketChange ?? 0 < 0
                    ? "text-red-600"
                    : "text-green-600"
                } text-[14px]`}
              >
                {stockDetails?.postMarketChange}
              </span>
              <span
                className={`base-class ${
                  stockDetails?.postMarketChange ?? 0 < 0
                    ? "text-red-600"
                    : "text-green-600"
                } text-[14px]`}
              >
                ({stockDetails?.postMarketChangePercent}%)
              </span>
            </div>
            <div className="flex gap-3 items-center text-[13px]">
              <span>After Hours: </span>
              <span>{formatTime(stockDetails?.postMarketTime)}</span>
              <FaMoon />
            </div>
          </div>
          <div>
            {stockDetails?.symbol ? (
              <TradingViewChart
                key={stockDetails.symbol}
                symbol={stockDetails.symbol}
                exchDisp={exchDisp ?? ""}
              />
            ) : (
              <p>Loading chart...</p>
            )}
          </div>
          <div>
            <h2 className="text-start font-semibold my-3">Key Data</h2>
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
              <span>Open</span>
              <span>${stockDetails?.regularMarketOpen}</span>
            </div>
            <div className="flex justify-between">
              <span>52 Week High/Low</span>
              <span>${stockDetails?.fiftyTwoWeekLow}</span>
            </div>
            <div className="flex justify-between">
              <span>Market Cap</span>
              <span>{stockDetails?.marketCap}</span>
            </div>
            <div className="flex justify-between">
              <span>Earnings per Share (EPS)</span>
              <span>{stockDetails?.epsCurrentYear}</span>
            </div>
            <div className="flex justify-between">
              <span>Fowrward P/E 1 yr.</span>
              <span>{stockDetails?.forwardPE}</span>
            </div>
            <div className="flex justify-between">
              <span>Ex Dividend Date</span>
              <span>{stockDetails?.dividendDate}</span>
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
