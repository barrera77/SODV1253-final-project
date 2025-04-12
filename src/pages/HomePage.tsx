import { useMostActive, useTickers, useStockNews } from "../hooks";
import { memo } from "react";
import { FaNewspaper } from "react-icons/fa";

const HomePage = () => {
  const { data: tickers } = useTickers();
  const { data: news, randomNews: random } = useStockNews();
  const { data: mostActive } = useMostActive();

  console.log("mostActive: ", mostActive);

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
    <div className="container m-auto mt-[5%] lg:w-[85%]">
      <div className="announcements flex mt-[2rem] border-t border-b border-[#0b022d]">
        <div className="announcements-content pt-[.5rem]">
          <div>
            <ul className="flex items-center">
              {tickers.map((ticker, index) => (
                <li key={ticker.symbol || index} className="text-[13px]">
                  <strong>{ticker.symbol} </strong>
                  {ticker.lastsale}{" "}
                  <span
                    className={
                      ticker.netchange >= 0 ? "text-green-500" : "text-red-500"
                    }
                  >
                    {ticker.netchange}
                  </span>
                  ({ticker.pctchange})
                  {index < tickers.length - 1 && (
                    <span className="mx-2">|</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="announcements-content pt-[.5rem]">
          <div>
            <ul className="flex items-center">
              {tickers.map((ticker, index) => (
                <li key={ticker.symbol || index} className="text-[13px]">
                  <strong>{ticker.symbol} </strong> {ticker.lastsale}{" "}
                  {ticker.netchange}({ticker.pctchange})
                  {index < tickers.length - 1 && (
                    <span className="mx-2">|</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex mt-8">
        {/* Left Column */}
        <div className="w-[75%] ">
          <div className="flex gap-4">
            {random && (
              <div className="w-[60%] border border-[#0b022d] p-4">
                <div>
                  <img src={random?.img} alt="news image" />
                  <div className="mt-4">
                    <h2 className="text-left font-bold text-2xl">
                      {random.title}
                    </h2>
                    <p className="text-left text-[14px] pt-3">
                      {random?.source} | {random?.ago}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-5 text-[12px] w-[100%]">
                  RELATED
                  <div className="border-t border-dotted border-gray-700 w-[100%]"></div>
                </div>
                <div className="mt-4">
                  <ul className="text-left">
                    {news.slice(0, 4).map((article, index) => (
                      <li
                        key={index}
                        className="flex gap-3 items-center text-[14px]"
                      >
                        <FaNewspaper className="text-blue-700" />
                        {article.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {/* 2nd left column */}
            {news.length > 0 && (
              <div className="w-[40%] border border-[#0b022d] p-4">
                <div>
                  <div>
                    <img src={news[0].img} alt="news image" />
                    <div className="mt-4">
                      <h2 className="text-left font-bold text-2xl">
                        {news[0].title}
                      </h2>
                      <p className="text-left ">{news[0].text}</p>
                      <p className="text-left text-[14px] pt-3">
                        {news[0].source} | {news[0].ago}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-5 text-[12px] w-[100%]">
                  RELATED
                  <div className="border-t border-dotted border-gray-700 w-[100%]"></div>
                </div>
                <div className="mt-4">
                  <ul className="text-left">
                    {news.slice(0, 4).map((article, index) => (
                      <li
                        key={index}
                        className="flex gap-3 items-center text-[14px]"
                      >
                        <FaNewspaper className="text-blue-700" />
                        {truncateText(article.title, 50)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 mt-5 text-[12px] w-[100%]">
            <span className="w-[10%]"> OTHER TOP STORIES</span>
            <div className="border-t border-dotted border-gray-700 w-[90%]"></div>
          </div>
          <div className="flex gap-4 mt-4">
            <div>
              <ul>
                {news.slice(0, 4).map((article, index) => (
                  <li key={index} className="text-left mb-2">
                    <strong>{article.title}</strong>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ul>
                {news.slice(5, 9).map((article, index) => (
                  <li key={index} className="text-left mb-2">
                    <strong>{article.title}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* right Column */}
        <div className="w-[25%]">
          <h2>Most Active Financial Stocks</h2>
          <div className="px-4">
            {mostActive &&
              mostActive.slice(0, 5).map((stock, index) => (
                <div
                  key={stock.symbol || index}
                  className="flex flex-col gap-4 mt-4 border border-[#0b022d] p-4 text-left"
                >
                  <h2 className="text-2xl font-bold">{stock.percentChange}</h2>
                  <p>{stock.symbolName}</p>
                  <p className="text-[13px]">${stock.lastPrice}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="py-5">
        <h2 className="font-bold text-left">Latest Articles</h2>

        <div className="flex gap-4 my-4 py-5 overflow-x-scroll flex-nowrap">
          {news &&
            news.length > 0 &&
            news.map((article, index) => (
              <div key={index} className="w-[300px] flex-shrink-0">
                <img src={article?.img} alt="news image" />
                <div className="mt-4">
                  <h2 className="text-left font-bold">{article.title}</h2>
                  <p className="text-left text-[14px] pt-3">{article?.time}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default memo(HomePage);
