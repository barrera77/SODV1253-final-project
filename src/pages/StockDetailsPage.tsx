import useAuth from "../hooks/useAuth";
import { addToWatchlist } from "../Services";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaPlusCircle } from "react-icons/fa";
import TradingViewChart from "../components/TradingViewWidget";
import { useStockNews, useStockDetails } from "../hooks";

const StockDetailsPage = () => {
  const { user } = useAuth();
  const { symbol } = useParams<{ symbol: string | undefined }>();
  const navigate = useNavigate();

  const { stockDetails } = useStockDetails(symbol);
  const { data: news } = useStockNews();

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

    alert("symbol Added successfully!");
  };

  return (
    <div className="container lg:w-[85%] mt-[5%] m-auto">
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
                news.map((article, index) => (
                  <div
                    key={index}
                    className="flex gap-2 py-3 border-b border-slate-200"
                  >
                    <div className="w-[80%]">
                      <Link
                        to={article.link}
                        target="blank"
                        className="hover:text-blue-500"
                      >
                        <span className="text-[14px] font-semibold">
                          {article.title}
                        </span>
                      </Link>
                      <div className="flex gap-3 text-[13px] pt-2">
                        <span>{article.source}</span>•
                        <span>{article.time}</span>
                      </div>
                    </div>

                    <div className="w-[20%]">
                      <img
                        className="w-full h-full bg-cover"
                        src={article.img}
                        alt="News Thumbnail"
                      />
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
