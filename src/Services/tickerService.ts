/* import { fetchData } from "./api-client";

export interface Ticker  {
  symbol: string;
  name: string;
  lastsale: number;
  netchange: number;
  pctchange: number;
}

export interface ITickerService {
  getTickers(): Promise<Ticker[]>;
}

const TICKERS_END_POINT = "v2/markets/tickers?&type=STOCKS";

export class TickerService implements ITickerService  {

  
async getTickers(): Promise<Ticker[]>  {
  const data = await fetchData(TICKERS_END_POINT);

  
}

} */
