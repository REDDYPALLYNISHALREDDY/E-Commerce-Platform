import { Link } from "react-router-dom";
import { FaHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {

  const { addToCart } = useCart();

  const image =
    product.images?.length
      ? product.images[0]
      : "https://via.placeholder.com/300";

  const originalPrice = Math.round(product.price * 1.2);

  return (

    <div className="overflow-hidden duration-300 bg-white shadow-md rounded-3xl hover:shadow-2xl hover:-translate-y-2 group">

      <div className="relative">

        <Link to={`/products/${product._id}`}>

          <img
            src={image}
            alt={product.name}
            className="object-cover w-full h-64 duration-500 group-hover:scale-110"
          />

        </Link>

        <span className="absolute px-3 py-1 text-xs text-white bg-green-600 rounded-full top-4 left-4">
          NEW
        </span>

        <button className="absolute p-3 bg-white rounded-full shadow top-4 right-4 hover:bg-red-50">

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

          <span className="ml-2 text-sm text-gray-500">

            (128)

          </span>

        </div>

        <h2 className="mt-3 text-2xl font-bold">

          {product.name}

        </h2>

        <p className="text-gray-500">

          {product.brand}

        </p>

        <div className="flex items-center gap-3 mt-4">

          <span className="text-2xl font-bold text-blue-700">

            ₹{product.price}

          </span>

          <span className="text-gray-400 line-through">

            ₹{originalPrice}

          </span>

        </div>

        <button
          onClick={(e) => {
            e.preventDefault(); 
            addToCart(product,1);
          }}
          className="flex items-center justify-center w-full gap-2 py-3 mt-6 text-white bg-blue-700 hover:bg-blue-800 rounded-xl"
        >

          <FaShoppingCart />

          Add to Cart

        </button>

      </div>

    </div>

  );

};

export default ProductCard;