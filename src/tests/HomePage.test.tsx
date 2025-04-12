import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import HomePage from "../pages/HomePage";

// Mock the custom hooks
vi.mock("../hooks", () => ({
  useTickers: () => ({
    data: [
      { symbol: "AAPL", lastsale: "$150", netchange: 1.5, pctchange: "1%" },
    ],
    error: null,
  }),
  useStockNews: () => ({
    data: [
      {
        title: "Stock Market News",
        img: "https://example.com/image.jpg",
        source: "NewsSource",
        ago: "2h ago",
        text: "Some summary",
        time: "Today",
        link: "https://example.com/news",
        tickers: ["AAPL", "GOOG"],
      },
    ],
    error: null,
    randomNews: {
      title: "Breaking News",
      img: "https://example.com/random.jpg",
      source: "RandomSource",
      ago: "1h ago",
      text: "Some random text",
      time: "Now",
      link: "https://example.com/breaking",
      tickers: ["MSFT"],
    },
  }),

  useMostActive: () => ({
    data: [
      {
        symbol: "GOOGL",
        symbolName: "Alphabet Inc.",
        percentChange: "+2.3%",
        lastPrice: "2800",
      },
    ],
    error: null,
  }),
}));

describe("HomePage", () => {
  it("renders ticker symbols", () => {
    render(<HomePage />);
    expect(screen.getAllByText("AAPL")).toHaveLength(2); // Appears twice
  });

  it("renders the random news section", async () => {
    render(<HomePage />);
    const randomNews = await screen.findByText("Breaking News");
    expect(randomNews).toBeInTheDocument();
  });

  it("renders most active stocks", () => {
    render(<HomePage />);
    expect(screen.getByText("Alphabet Inc.")).toBeInTheDocument();
    expect(screen.getByText("$2800")).toBeInTheDocument();
  });

  it("renders 'Latest Articles' section", () => {
    render(<HomePage />);
    expect(screen.getByText("Latest Articles")).toBeInTheDocument();
  });
});
