import { FaUser } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { FaArrowTrendUp } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { fetchData } from "../Services/api-client";

const GAINERS_END_POINT = "v1/markets/screener?list=day_gainers";
const LOSERS_END_POINT = "v1/markets/screener?list=day_losers ";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  interface Stock {
    region: string;
    symbol: string;
    longName: string;
    shortName: string;
    displayName: string;
    regularMarketPrice: number;
    exchangeTimezoneShortName: string;
    regularMarketTime: number;
    regularMarketDayHigh: number;
    regularMarketChange: number;
    regularMarketChangePercent: number;
  }

  const [gainers, setGainers] = useState<Stock[]>([]);
  const { user } = useAuth();

  const end_point = "v1/markets/screener?list=day_gainers";

  const getMarketMovers = async () => {
    try {
      const data = await fetchData(end_point);

      if (!data || data.length === 0) {
        setError("No data available");
        return;
      }

      setGainers(data);
    } catch {
      setError("Failed to fetch data");
      setGainers([]);
    }
  };

  //get the use input
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const truncateText = (text: string, maxLength: number = 20) => {
    if (!text) return "N/A"; // Handle empty names
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  useEffect(() => {
    getMarketMovers();
  }, []);

  return (
    <>
      <div className="container m-auto">
        <div className="w-[60%] flex items-center justify-between py-5 mb-2">
          <div className="flex gap-3">
            <FaUser className="text-xl" />
            {user ? <h2>{user.email}</h2> : <h2></h2>}
          </div>
          <div>
            <ul className="flex gap-3">
              <li>Porfolio</li>
              <li>Watchlist</li>
              <li>Top Gainers</li>
              <li>Top Losers</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="flex gap-[3%]">
            <div className="w-[75%]"></div>
            <div className="w-[22%] flex flex-col gap-5">
              <div className="w-full flex-col p-4 border border-[#0b022d] ">
                <div className="flex gap-3 items-center py-2 mb-2">
                  <FaArrowTrendUp className="text-xl" />
                  <span>Symbol Search</span>
                </div>
                <div>
                  <form action="" className="flex flex-col gap-3">
                    <input
                      type="search"
                      id="dashboard-search"
                      placeholder="Search for a symbol"
                      required
                      className="w-full p-4 sm:py-3 xl:ps-2 text-sm rounded-lg border border-gray-300 bg-[#fff]"
                    />
                    <button className="btn border border-[#0b022d] bg-[#0b022d] text-[#fff] ">
                      Search
                    </button>
                  </form>
                </div>
              </div>
              <div className="p-[1rem] border">
                <div className="mb-3">
                  <h2 className="text-start font-semibold ">Day Gainers</h2>
                </div>
                <ul>
                  {gainers.slice(0, 5).map((stock: Stock) => (
                    <li
                      key={stock.symbol}
                      className="text-sm py-1 border-b border-dashed"
                    >
                      <div className="flex justify-between">
                        <a href="" className="text-sm hover:underline">
                          {stock.symbol}
                        </a>
                        <span>{stock.regularMarketPrice}</span>
                      </div>
                      <div className="flex justify-between text-[12px]">
                        <span>{truncateText(stock.shortName, 20)}</span>
                        <span className="text-green-700">
                          + {stock.regularMarketChange} (+
                          {stock.regularMarketChangePercent}%)
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2>Top Losers</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
