import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import Layout from "./components/Layout";
import Blog from "./pages/Blog";
import Archive from "./components/Archive";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
    </Layout>
  );
}

export default App;
