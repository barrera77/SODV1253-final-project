import { User } from "firebase/auth";

export interface Stock {
  region: string;
  symbol: string;
  fullExchangeName: string;
  longName: string;
  shortName: string;
  displayName: string;
  currency: string;
  regularMarketPrice: number;
  exchangeTimezoneShortName: string;
  regularMarketTime: number;
  regularMarketDayHigh: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketPreviousClose: number;
}

export interface SearchItem {
  symbol: string;
  name: string;
  typeDisp: string;
  exchDisp: string;
}

export interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface UserRegistration {
  email: string;
  password: string;
  name: string;
}

export interface FormErrors {
  emailError?: string;
  passwordError?: string;
  passwordConfirmationError?: string;
}

export interface Inputs {
  email: string;
  password: string;
}

export interface Ticker {
  symbol: string;
  name: string;
  lastsale: number;
  netchange: number;
  pctchange: number;
}
