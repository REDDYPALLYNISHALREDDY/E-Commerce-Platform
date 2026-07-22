import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { logoutUser } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, setUser, loading } = useAuth();

  const { cartItems } = useCart();

  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/?keyword=${keyword}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();

      setUser(null);

      toast.success("Logged out successfully");

      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  if (loading) return null;

  return (
    <>
      {/* Top Offer Bar */}

      <div className="py-2 text-sm font-medium text-center text-white bg-blue-700">
        🎉 Big Sale is Live! Up to 50% OFF
      </div>

      {/* Main Navbar */}

      <nav className="sticky top-0 z-50 bg-white shadow">

        <div className="flex items-center justify-between h-20 px-5 mx-auto max-w-7xl">

          {/* Logo */}

          <Link
            to="/"
            className="flex-shrink-0 text-4xl font-extrabold text-blue-700 whitespace-nowrap"
          >
            E-Commerce
          </Link>

          <form
            onSubmit={handleSearch}
            className="hidden lg:flex items-center border rounded-full overflow-hidden w-[360px] xl:w-[450px]"
          >

            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-4 py-2 outline-none"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            <button
              type="submit"
              className="px-5 py-3 text-white bg-blue-700"
            >
              <FaSearch />
            </button>

          </form>

          {/* Right Side */}

          <div className="flex items-center gap-6">

            <FaHeart
              size={22}
              className="cursor-pointer hover:text-red-500"
            />

            <Link to="/cart" className="relative">

              <FaShoppingCart
                size={22}
                className="cursor-pointer"
              />

              <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-2">
                {cartItems.length}
              </span>

            </Link>

            {user ? (

              <div className="flex items-center flex-shrink-0 gap-4">

                {user.role === "admin" && (
                    <Link
                        to="/admin"
                        className="px-4 py-2 text-white transition bg-blue-700 rounded-lg hover:bg-blue-800"
                    >
                        Admin
                    </Link>
                )}

                <FaUserCircle size={28} />

                <span className="font-medium whitespace-nowrap max-w-[220px] truncate" title={user.name}>
                    Hi, {user.name}
                </span>

                <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-white transition bg-red-500 rounded-lg hover:bg-red-600"
                >
                    Logout
                </button>

            </div>
            ) : (

              <>

                <Link to="/login">
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-2 text-white bg-blue-700 rounded-lg"
                >
                  Register
                </Link>

              </>

            )}

          </div>

        </div>

      </nav>
    </>
  );
};

export default Navbar;