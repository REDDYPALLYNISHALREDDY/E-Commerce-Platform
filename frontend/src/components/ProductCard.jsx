import { Link } from "react-router-dom";
import { FaHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {

  const { addToCart } = useCart();

  const image =
    product.images?.length
      ? `http://localhost:5000${product.images[0]}`
      : "https://via.placeholder.com/300";

  const originalPrice = Math.round(product.price * 1.2);

  return (

    <div className="bg-white rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 duration-300 overflow-hidden group">

      <div className="relative">

        <Link to={`/products/${product._id}`}>

          <img
            src={image}
            alt={product.name}
            className="h-64 w-full object-cover group-hover:scale-110 duration-500"
          />

        </Link>

        <span className="absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
          NEW
        </span>

        <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow hover:bg-red-50">

          <FaHeart className="text-red-500" />

        </button>

      </div>

      <div className="p-5">

        <div className="flex items-center gap-1 text-yellow-500">

          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />

          <span className="text-gray-500 text-sm ml-2">

            (128)

          </span>

        </div>

        <h2 className="text-2xl font-bold mt-3">

          {product.name}

        </h2>

        <p className="text-gray-500">

          {product.brand}

        </p>

        <div className="flex items-center gap-3 mt-4">

          <span className="text-2xl font-bold text-blue-700">

            ₹{product.price}

          </span>

          <span className="line-through text-gray-400">

            ₹{originalPrice}

          </span>

        </div>

        <button
          onClick={(e) => {
            e.preventDefault(); 
            addToCart(product,1);
          }}
          className="w-full mt-6 bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl flex items-center justify-center gap-2"
        >

          <FaShoppingCart />

          Add to Cart

        </button>

      </div>

    </div>

  );

};

export default ProductCard;