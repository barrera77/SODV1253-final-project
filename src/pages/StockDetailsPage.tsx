import useAuth from "../hooks/useAuth";
import { addToWatchlist } from "../services/watchListService";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchData, fetchDataInRealTime } from "../services/api-client";
import { FaArrowLeft, FaPlusCircle } from "react-icons/fa";
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
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketTime: number;
}

interface NewsItem {
  link: string;
  publisher: string;
  title: string;
  id: string;
  url: string;
  pubtime: number;
  images?: {
    original?: {
      url: string;
      height: number;
      width: number;
    };
  };
}

const StockDetailsPage = () => {
  const { user } = useAuth();

  const [stockDetails, setStockDetails] = useState<StockDetails | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [error, setError] = useState("");

  const { symbol } = useParams<{
    symbol: string | undefined;
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
    setStockDetails(data[0]);
  };

  const getStockNews = async () => {
    if (!symbol) {
      return;
    }
    const data = await fetchDataInRealTime(
      `get-list?lang=en-US&region=US&symbol=${symbol}`
    );

    if (!data || data.length === 0) {
      setError("No data available");
      return;
    }
    console.log(data);
    setNews(data as NewsItem[]);
  };

  const handleAddToWatchList = async () => {
    if (!user || !stockDetails) {
      return;
    }

    await addToWatchlist(user.uid, {
      symbol: stockDetails.symbol,
      shortName: stockDetails.shortName,
      currency: stockDetails.currency,
      regularMarketPrice: stockDetails.regularMarketChange,
      regularMarketPreviousClose: stockDetails.regularMarketPreviousClose,
      regularMarketChange: stockDetails.regularMarketChange,
      regularMarketChangePercent: stockDetails.regularMarketChangePercent,
      regularMarketTime: stockDetails.regularMarketTime,
    });

    alert("symbol Added succesfully!");
  };

  useEffect(() => {
    getstockDetails();
    getStockNews();
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
              <span>{stockDetails?.quoteSourceName}</span>
            </div>
          </div>
          <button onClick={handleAddToWatchList} className="btn flex gap-3">
            <FaPlusCircle className="text-2xl" />
            Add to watchlist
          </button>
        </div>
        <div className="flex">
          <div className="w-[70%]">
            <div className="">
              {stockDetails?.symbol ? (
                <TradingViewChart
                  key={stockDetails.symbol}
                  symbol={stockDetails.symbol}
                />
              ) : (
                <p>Loading chart...</p>
              )}
            </div>

            <div className="mt-4">
              <div className="border-b border-slate-200">
                <h2 className="text-start font-semibold px-3">Key Data</h2>
              </div>
              <div className="p-3 text-[14px]">
                <div className="data-row">
                  <span>Share Volume</span>
                  <span>{stockDetails?.regularMarketVolume}</span>
                </div>
                <div className="data-row">
                  <span>Average Volume</span>
                  <span>{stockDetails?.averageDailyVolume3Month}</span>
                </div>
                <div className="data-row">
                  <span>Previous Close</span>
                  <span>${stockDetails?.regularMarketPreviousClose}</span>
                </div>
                <div className="data-row">
                  <span>Open</span>
                  <span>${stockDetails?.regularMarketOpen}</span>
                </div>
                <div className="data-row">
                  <span>52 Week High/Low</span>
                  <span>${stockDetails?.fiftyTwoWeekLow}</span>
                </div>
                <div className="data-row">
                  <span>Market Cap</span>
                  <span>{stockDetails?.marketCap}</span>
                </div>
                <div className="data-row">
                  <span>Earnings per Share (EPS)</span>
                  <span>{stockDetails?.epsCurrentYear}</span>
                </div>
                <div className="data-row">
                  <span>Fowrward P/E 1 yr.</span>
                  <span>{stockDetails?.forwardPE || "Unknown"}</span>
                </div>
                <div className="data-row">
                  <span>Ex Dividend Date</span>
                  <span>{stockDetails?.dividendDate || "Unknown"}</span>
                </div>
                <div className="flex justify-between">
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[30%] text-start">
            <h2 className="text-start font-semibold pt-4 px-4">News</h2>
            <div className="max-h-[800px] overflow-y-scroll p-4">
              {news && news.length > 0 ? (
                news.map((article) => (
                  <div
                    key={article.id}
                    className="flex gap-2 py-3 border-b border-slate-200"
                  >
                    <div className="w-[80%]">
                      <Link
                        to={article.url}
                        target="blank"
                        className="hover:text-blue-500"
                      >
                        <span className="text-[14px] font-semibold">
                          {article.title}
                        </span>
                      </Link>
                      <div className="flex gap-3 text-[13px] pt-2">
                        <span>{article.publisher}</span>•
                        <span>{formatTime(article.pubtime)}</span>
                      </div>
                    </div>
                    <div className="w-[20%]">
                      {article.images?.original?.url && (
                        <img
                          src={article.images.original.url}
                          alt="News Thumbnail"
                          className="w-full h-full bg-cover"
                        />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <span>No news Found</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetailsPage;
