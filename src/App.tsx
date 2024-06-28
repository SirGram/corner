
import "./App.css";
import { Route, Routes } from "react-router-dom";
import PortfolioPage from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
      </Routes>
    </>
  );
}

export default App;
