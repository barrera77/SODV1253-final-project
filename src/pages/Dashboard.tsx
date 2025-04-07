import { FaBinoculars, FaChevronUp, FaUser } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { FaArrowTrendUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useTopGainers, useTopLosers, useWatchlist, useSearch } from "../hooks";
import { Stock } from "../constants";

const Dashboard = () => {
  const { user } = useAuth();
  const { data: gainers, error: gainersError } = useTopGainers();
  const { data: losers, error: losersError } = useTopLosers();
  const watchlist: Stock[] = user ? useWatchlist(user.uid) : [];
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    getSearchResults,
    error: searchError,
  } = useSearch();

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

  /**
   * Shorten the text for display purposes
   * @param text
   * @param maxLength
   * @returns
   */
  const truncateText = (text: string, maxLength: number = 20) => {
    if (!text) return "N/A"; // Handle empty names
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <>
      <div className="container m-auto mt-[5%]">
        <h2 className="text-start font-semibold text-xl">Dashboard</h2>
        <div className="w-[75%] flex items-center justify-between py-5 mb-2">
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
            <div className="w-[75%]">
              <div className="mb-5 w-[90%] border p-[1rem]">
                <h2 className="text-start font-semibold mb-3">Watchlist</h2>
                <div>
                  <table className="table-fixed text-start text-sm bg-[#fff] w-full">
                    <thead className="border-b border-gray-200">
                      <tr>
                        <th className="text-start p-2">
                          <Link to="">Symbol</Link>
                        </th>
                        <th className="text-start p-2">Currency</th>
                        <th className="text-start p-2">Price</th>
                        <th className="text-start p-2">Last</th>
                        <th className="text-start p-2">Change</th>
                        <th className="text-start p-2">Change(%)</th>
                        <th className="text-start p-2">Market Time</th>
                        <th className="text-start p-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {watchlist.length === 0 ? (
                        <tr>
                          <td>No stocks in your watchlist yet.</td>
                        </tr>
                      ) : (
                        watchlist.map((stock, index) => (
                          <tr key={`${stock.symbol}-${index}`}>
                            <td className="p-2">{stock.symbol}</td>
                            <td className="p-2">{stock.currency}</td>
                            <td className="p-2">{stock.regularMarketPrice}</td>
                            <td className="p-2">
                              {stock.regularMarketPreviousClose}
                            </td>
                            <td className="p-2">{stock.regularMarketChange}</td>
                            <td className="p-2">
                              {stock.regularMarketChangePercent}
                            </td>
                            <td className="p-2">
                              {formatTime(stock.regularMarketTime)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex gap-3 w-[90%]">
                <div className="p-[1rem] border w-[50%]">
                  <h2 className="text-start font-semibold mb-3">
                    America Stock Market
                  </h2>
                  <div>
                    <table className="table-fixed text-start text-sm w-full bg-[#fff] px-2">
                      <thead className="border-b border-gray-200">
                        <tr>
                          <th className="text-start p-2">Symbol</th>
                          <th className="text-start p-2">Price</th>
                          <th className="text-start p-2">Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2">
                            <span className="flex gap-2 items-center">
                              <FaChevronUp className="text-green-700" />
                              <a
                                href=""
                                className="text-blue-500 text-sm hover:underline"
                              >
                                CDN
                              </a>
                            </span>
                            <span className="text-gray-400 text-[13px]">
                              Nasdaq Canadian
                            </span>
                          </td>
                          <td>0.76373737</td>
                          <td className="text-green-700">+15.99 %</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="p-[1rem] border w-[50%]">
                  <h2 className="text-start font-semibold mb-3">
                    Europe Stock Market
                  </h2>
                  <table className="table-auto text-start text-sm w-full bg-[#fff]">
                    <thead className="border-b border-gray-200">
                      <tr>
                        <th className="text-start p-2">Symbol</th>
                        <th className="text-start p-2">Price</th>
                        <th className="text-start p-2">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2">
                          <span className="flex gap-2 items-center">
                            <FaChevronUp className="text-green-700" />
                            <a
                              href=""
                              className="text-blue-500 text-sm hover:underline"
                            >
                              CDN
                            </a>
                          </span>
                          <span className="text-gray-400 text-[13px]">
                            Nasdaq Canadian
                          </span>
                        </td>
                        <td>0.76373737</td>
                        <td className="text-green-700">+15.99 %</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Search Results */}
              <div className="mt-5 w-[90%]">
                <div className="border p-[1rem]">
                  <h2 className="text-start font-semibold mb-3">
                    Stock Search Results
                  </h2>
                  <table className="table-auto text-start text-sm bg-[#fff] w-full">
                    <thead className="border-b border-gray-200">
                      <tr>
                        <th className="text-start p-2">Stock</th>
                        <th className="text-start p-2">Name</th>
                        <th className="text-start p-2">Type</th>
                        <th className="text-start p-2">Exchange</th>
                        <th className="text-start p-2">See Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults && searchResults.length > 0 ? (
                        searchResults.map((result, index) => (
                          <tr
                            key={`${result.symbol}-${index}`}
                            className="border-b border-slate-200"
                          >
                            <td className="p-2">{result.symbol || "N/A"}</td>
                            <td className="p-2">{result.name || "Unknown"}</td>
                            <td className="p-2">{result.typeDisp || "N/A"}</td>
                            <td className="p-2">{result.exchDisp || "N/A"}</td>
                            <td className="flex justify-center pt-2">
                              <Link
                                to={`/details/${result.symbol}`}
                                className="text-center hover:text-blue-500"
                              >
                                <FaBinoculars className="text-xl " />
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center text-gray-500">
                            No results found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* right Column */}
            <div className="w-[22%] flex flex-col gap-5">
              <div className="w-full flex-col p-4 border border-[#0b022d] ">
                <div className="flex gap-3 items-center py-2 mb-2">
                  <FaArrowTrendUp className="text-xl" />
                  <span>Symbol Search</span>
                </div>
                <div>
                  <form
                    onSubmit={getSearchResults}
                    className="flex flex-col gap-3"
                  >
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      id="dashboard-search"
                      placeholder="Search for a symbol"
                      required
                      className="w-full p-4 sm:py-3 xl:ps-2 text-sm rounded-lg border border-gray-300 bg-[#fff]"
                    />
                    <button
                      type="submit"
                      className="btn border border-[#0b022d] bg-[#0b022d] text-[#fff]"
                    >
                      Search
                    </button>
                  </form>
                </div>
              </div>
              <div className="p-[1rem] border">
                <div className="mb-3">
                  <h2 className="text-start font-semibold ">
                    Top 5 Daily Gainers
                  </h2>
                </div>
                <ul>
                  {gainers.slice(0, 5).map((stock: Stock) => (
                    <li
                      key={stock.symbol}
                      className="text-sm py-1 border-b border-dashed"
                    >
                      <div className="flex justify-between">
                        <Link
                          to={`/details/${stock.symbol}`}
                          className="text-blue-500 text-sm hover:underline"
                        >
                          {stock.symbol}
                        </Link>
                        <span>{stock.regularMarketPrice}</span>
                      </div>
                      <div className="flex justify-between text-[12px]">
                        <span className="text-gray-400 text-[13px]">
                          {truncateText(stock.shortName, 20)}
                        </span>
                        <span className="text-green-700">
                          + {stock.regularMarketChange} (+
                          {stock.regularMarketChangePercent}%)
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-[1rem] border">
                <div className="mb-3">
                  <h2 className="text-start font-semibold ">
                    Top 5 Daily Losers
                  </h2>
                </div>
                <ul>
                  {losers.slice(0, 5).map((stock: Stock) => (
                    <li
                      key={stock.symbol}
                      className="text-sm py-1 border-b border-dashed"
                    >
                      <div className="flex justify-between">
                        <Link
                          to={`/details/${stock.symbol}`}
                          className="text-blue-500 text-sm hover:underline"
                        >
                          {stock.symbol}
                        </Link>
                        <span>{stock.regularMarketPrice}</span>
                      </div>
                      <div className="flex justify-between text-[12px]">
                        <span>{truncateText(stock.shortName, 20)}</span>
                        <span className="text-red-700">
                          - {stock.regularMarketChange} (-
                          {stock.regularMarketChangePercent}%)
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
