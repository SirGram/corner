import "./App.css";
import { Route, Routes } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import Layout from "./components/Layout";
import Blog from "./pages/Blog";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        {/* Add more routes here as needed */}
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
    </Layout>
  );
}

export default App;
