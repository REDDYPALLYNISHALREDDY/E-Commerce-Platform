import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";

import { getSingleProduct } from "../services/product.service";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const data = await getSingleProduct(id);
      setProduct(data.product);
    } catch {
      toast.error("Failed to load product");
    }
  };

  if (!product) {
    return (
      <div className="text-center py-20 text-2xl">
        Loading...
      </div>
    );
  }

  const image =
    product.images?.length > 0
      ? `http://localhost:5000${product.images[0]}`
      : "https://via.placeholder.com/600";

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      <div className="grid lg:grid-cols-2 gap-12">

        {/* Left */}

        <div>

          <img
            src={image}
            alt={product.name}
            className="w-full rounded-3xl shadow-lg"
          />

        </div>

        {/* Right */}

        <div>

          <h1 className="text-5xl font-bold">

            {product.name}

          </h1>

          <div className="flex items-center gap-2 mt-5">

            <FaStar className="text-yellow-500" />

            <FaStar className="text-yellow-500" />

            <FaStar className="text-yellow-500" />

            <FaStar className="text-yellow-500" />

            <FaStar className="text-yellow-500" />

            <span className="text-gray-500">

              (128 Reviews)

            </span>

          </div>

          <p className="text-gray-500 mt-5">

            Brand:
            <span className="font-semibold">

              {" "}{product.brand}

            </span>

          </p>

          <div className="flex items-center gap-4 mt-8">

            <h2 className="text-5xl text-blue-700 font-bold">

              ₹ {product.price}

            </h2>

            <span className="line-through text-gray-400 text-2xl">

              ₹ {Math.round(product.price * 1.2)}

            </span>

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

              20% OFF

            </span>

          </div>

          <p className="mt-6">

            {product.description}

          </p>

          <div className="mt-8">

            <span className="text-green-600 font-bold">

              ✓ In Stock ({product.stock})

            </span>

          </div>

          {/* Quantity */}

          <div className="flex items-center gap-5 mt-10">

            <button
              onClick={() =>
                quantity > 1 &&
                setQuantity(quantity - 1)
              }
              className="bg-gray-200 px-4 py-2 rounded-lg"
            >
              -

            </button>

            <span className="text-xl">

              {quantity}

            </span>

            <button
              onClick={() =>
                setQuantity(quantity + 1)
              }
              className="bg-gray-200 px-4 py-2 rounded-lg"
            >
              +

            </button>

          </div>

          {/* Buttons */}

          <div className="flex gap-5 mt-10">

            <button
              onClick={() => addToCart(product, quantity)}
              className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 rounded-xl"
            >
              Add to Cart
            </button>

            <button
              className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl"
            >
              Buy Now
            </button>

            <button
              className="bg-pink-100 p-4 rounded-xl"
            >
              <FaHeart className="text-red-500" />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;