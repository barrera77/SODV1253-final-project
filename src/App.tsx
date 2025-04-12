import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import StockDetailsPage from "./pages/StockDetailsPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { AuthProvider } from "./hooks/useAuth";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/details/:symbol" element={<StockDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </>
  );
}

export default App;
