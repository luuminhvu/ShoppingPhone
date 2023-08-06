import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Register";
import Login from "./components/Login";
import CheckoutSuccess from "./components/CheckoutSuccess";
import Dashboard from "./components/Admin/Dashboard";
import Products from "./components/Admin/Products";
import Summary from "./components/Admin/Summary";
import CreateProduct from "./components/Admin/CreateProduct";
import ListProducts from "./components/Admin/Products/ListProducts/ListProducts";
import Order from "./components/Admin/Orders/Order";
import Users from "./components/Admin/Users/Users";
import ProductDetail from "./components/Admin/Detail/ProductDetail";
import OrderDetail from "./components/Admin/Detail/OrderDetail";
import UserDetail from "./components/Admin/Detail/UserDetail";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/admin" element={<Dashboard />}>
            <Route path="products" element={<Products />}>
              <Route index element={<ListProducts />} />
              <Route path="create-product" element={<CreateProduct />} />
            </Route>
            <Route path="orders" element={<Order />} />
            <Route path="users" element={<Users />} />
            <Route path="summary" element={<Summary />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
