import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/public/Home";
import Products from "./pages/public/Products";
import Contact from "./pages/public/Contact";
import About from "./pages/public/About";
import Blog from "./pages/public/Blog";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;
