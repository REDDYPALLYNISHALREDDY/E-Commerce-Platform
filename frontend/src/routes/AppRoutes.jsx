import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import ProductDetails from "../pages/ProductDetails";
import AddProduct from "../pages/AddProduct";
import AdminDashboard from "../pages/AdminDashboard";
import ManageProducts from "../pages/ManageProducts";
import AddCategory from "../pages/AddCategory";
import ManageCategories from "../pages/ManageCategories";
import EditProduct from "../pages/EditProduct";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import ManageOrders from "../pages/ManageOrders";
import EditCategory from "../pages/EditCategory";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route
            path="products/:id"
            element={<ProductDetails />}
        />
        <Route path="add-product" element={<AddProduct />} />
        <Route
            path="admin"
            element={<AdminDashboard />}
        />
        <Route
            path="manage-products"
            element={<ManageProducts />}
        />
        <Route path="add-category" element={<AddCategory />} />
        <Route
          path="manage-categories"
          element={<ManageCategories />}
        />
        <Route
          path="edit-product/:id"
          element={<EditProduct />}
        />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-success" element={<OrderSuccess />} />
        <Route
          path="manage-orders"
          element={<ManageOrders />}
        />
        <Route
          path="/edit-category/:id"
          element={<EditCategory />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;