// StockDetailsPage.test.tsx
import { describe, it, vi, beforeEach, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import StockDetailsPage from "../pages/StockDetailsPage";
import { addToWatchlist } from "../Services/watchListService";
import "@testing-library/jest-dom";

// Mocks
vi.mock("../hooks/useAuth", () => ({
  default: () => ({ user: { uid: "123", email: "test@example.com" } }),
}));

vi.mock("../hooks", () => ({
  useStockDetails: () => ({
    stockDetails: {
      symbol: "AAPL",
      shortName: "Apple Inc.",
      fullExchangeName: "NASDAQ",
      quoteSourceName: "Yahoo Finance",
      regularMarketVolume: 100000,
      averageDailyVolume3Month: 90000,
      regularMarketPreviousClose: 148,
      regularMarketOpen: 149,
      fiftyTwoWeekLow: 120,
      marketCap: "2T",
      epsCurrentYear: 6.5,
      forwardPE: 25,
      dividendDate: "2024-12-01",
      regularMarketChange: 2,
      regularMarketChangePercent: 1.35,
      regularMarketTime: 1712800000,
      currency: "USD",
    },
  }),
  useStockNews: () => ({
    data: [
      {
        title: "Apple hits new highs",
        link: "https://example.com/apple",
        img: "https://example.com/image.jpg",
        source: "Yahoo",
        time: "1h ago",
      },
    ],
    randomNews: [],
  }),
}));

vi.mock("../services/watchListService", async () => {
  return {
    addToWatchlist: vi.fn(),
  };
});

vi.mock("../components/TradingViewWidget", () => ({
  default: () => <div data-testid="chart">Trading Chart</div>,
}));

describe("StockDetailsPage", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/stocks/AAPL"]}>
        <Routes>
          <Route path="/stocks/:symbol" element={<StockDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );
  });

  it("renders stock details", () => {
    expect(screen.getByText("Apple Inc. (AAPL)")).toBeInTheDocument();
    expect(screen.getByText("NASDAQ")).toBeInTheDocument();
    expect(screen.getByText("Yahoo Finance")).toBeInTheDocument();
    expect(screen.getByText("$148")).toBeInTheDocument();
    expect(screen.getByText("$149")).toBeInTheDocument();
    expect(screen.getByText("2T")).toBeInTheDocument();
    expect(screen.getByText("6.5")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
  });

  it("renders chart component", () => {
    expect(screen.getByTestId("chart")).toBeInTheDocument();
  });

  it("renders news section", () => {
    expect(screen.getByText("News")).toBeInTheDocument();
    expect(screen.getByText("Apple hits new highs")).toBeInTheDocument();
    expect(screen.getByText("Yahoo")).toBeInTheDocument();
    expect(screen.getByText("1h ago")).toBeInTheDocument();
  });

  it("adds stock to watchlist when button clicked", async () => {
    const alertMock = vi.fn(); // Mocking the alert function
    global.alert = alertMock; // Setting it on the global object

    const addButton = screen.getByRole("button", {
      name: /Add to watchlist/i,
    });

    // Simulate button click
    fireEvent.click(addButton);

    // Wait for the async addToWatchlist function to complete
    await waitFor(() =>
      expect(alertMock).toHaveBeenCalledWith("symbol Added successfully!")
    );

    // You can also assert that addToWatchlist was called with the correct parameters
    expect(addToWatchlist).toHaveBeenCalledWith(
      "123",
      expect.objectContaining({
        symbol: "AAPL",
        shortName: "Apple Inc.",
      })
    );
  });

  it("navigates back to dashboard on back button click", () => {
    const backButton = screen.getByRole("button", {
      name: /Back to dashboard/i,
    });

    expect(backButton).toBeInTheDocument();
  });
});
