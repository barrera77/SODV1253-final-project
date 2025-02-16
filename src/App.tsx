import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import PortfolioPage from "./pages/PortfolioPage";
import WatchListPage from "./pages/WatchListPage";
import StockDetailsPage from "./pages/StockDetailsPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/watchlist" element={<WatchListPage />} />
          <Route path="/details" element={<StockDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
