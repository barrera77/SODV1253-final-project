import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
