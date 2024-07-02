import "./App.css";
import { Route, Routes } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import Layout from "./components/Layout";
import Blog from "./pages/Blog";
import Archive from "./components/Archive";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        {/* Add more routes here as needed */}
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
    </Layout>
  );
}

export default App;
