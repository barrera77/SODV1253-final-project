import { useTickers } from "../hooks";

const HomePage = () => {
  const { data, error } = useTickers();

  return (
    <div className="container m-auto mt-[5%]">
      <div className="announcements flex mt-[2rem] border-t border-b border-[#0b022d]">
        <div className="announcements-content pt-[.5rem]">
          <div>
            <ul className="flex items-center">
              {data.map((ticker, index) => (
                <li key={ticker.symbol} className="text-[13px]">
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
                  {index < data.length - 1 && <span className="mx-2">|</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="announcements-content pt-[.5rem]">
          <div>
            <ul className="flex items-center">
              {data.map((ticker, index) => (
                <li key={ticker.symbol} className="text-[13px]">
                  <strong>{ticker.symbol} </strong> {ticker.lastsale}{" "}
                  {ticker.netchange}({ticker.pctchange})
                  {index < data.length - 1 && <span className="mx-2">|</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <h1>This is the fkn home page, for now that is</h1>
      <div className="flex">
        {/* Left Column */}
        <div className="w-[75%] ">
          <div className="flex gap-4">
            <div className="w-[60%] border border-[#0b022d] ">
              <div>
                <img src="" alt="news image" />
                <h2>News Heading</h2>
              </div>
              <div className="flex items-center gap-2">
                Related
                <div className="border-t border-dotted border-gray-700 w-75 "></div>
              </div>
              <div></div>
            </div>
            <div className="w-[40%] border border-[#0b022d] ">
              <div>
                <div>
                  <img src="" alt="news image" />
                  <div>
                    <h2>News Heading</h2>
                    <p>News Description</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                Related
                <div className="border-t border-dotted border-gray-700 w-75 "></div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        {/* right Column */}
        <div className="w-[25%]">
          <h2>Best Financial Products</h2>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
