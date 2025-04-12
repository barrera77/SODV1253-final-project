import { describe, it, vi, beforeEach, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "../pages/Dashboard";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Mocks
vi.mock("../hooks/useAuth", () => ({
  default: () => ({ user: { email: "test@example.com", uid: "123" } }),
}));

vi.mock("../hooks", () => ({
  useTopGainers: () => ({
    data: [
      {
        symbol: "AAPL",
        regularMarketPrice: 150,
        shortName: "Apple Inc",
        regularMarketChange: 5,
        regularMarketChangePercent: 3.45,
      },
    ],
  }),
  useTopLosers: () => ({
    data: [
      {
        symbol: "TSLA",
        regularMarketPrice: 200,
        shortName: "Tesla Inc",
        regularMarketChange: -8,
        regularMarketChangePercent: -3.8,
      },
    ],
  }),
  useWatchlist: () => [
    {
      symbol: "MSFT",
      currency: "USD",
      regularMarketPrice: 300,
      regularMarketPreviousClose: 295,
      regularMarketChange: 5,
      regularMarketChangePercent: 1.7,
      regularMarketTime: 1712800000,
    },
  ],
  useSearch: () => {
    const setSearchQuery = vi.fn();
    const getSearchResults = vi.fn((e) => e.preventDefault());

    return {
      searchQuery: "AMZN",
      setSearchQuery,
      getSearchResults,
      searchResults: [
        {
          symbol: "GOOG",
          name: "Google",
          typeDisp: "Equity",
          exchDisp: "NASDAQ",
        },
      ],
      error: null,
    };
  },
  useSearchBar: () => ({
    searchResults: [],
  }),
}));

describe("Dashboard", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
  });

  it("renders user email", () => {
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("displays watchlist stocks", () => {
    expect(screen.getByText("MSFT")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
  });

  it("renders top gainers", () => {
    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("+ 5 (+3.45%)")).toBeInTheDocument();
  });

  it("renders top losers", () => {
    expect(screen.getByText("TSLA")).toBeInTheDocument();
    expect(screen.getByText("-8 (-3.8%)")).toBeInTheDocument();
  });

  it("displays stock search results", () => {
    expect(screen.getByText("GOOG")).toBeInTheDocument();
    expect(screen.getByText("Google")).toBeInTheDocument();
  });

  it("submits the search form", () => {
    const searchInput = screen.getByPlaceholderText("Search for a symbol");
    fireEvent.change(searchInput, { target: { value: "AMZN" } });

    const searchButton = screen.getByRole("button", { name: /search/i });
    fireEvent.click(searchButton);

    expect(searchInput).toHaveValue("AMZN");
  });
});
