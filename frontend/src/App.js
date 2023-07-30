import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Register/Register";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
