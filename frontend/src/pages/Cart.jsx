import { FaTrash } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 1000 ? 0 : 99;

  const gst = subtotal * 0.18;

  const total = subtotal + shipping + gst;

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">

      <h1 className="text-5xl font-bold mb-10">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow">
          <h2 className="text-2xl">
            Your cart is empty.
          </h2>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT */}

          <div className="lg:col-span-2 space-y-5">

            {cartItems.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md p-5 flex justify-between items-center"
              >

                <div className="flex gap-5">

                  <img
                    src={`http://localhost:5000${item.images[0]}`}
                    className="w-28 h-28 object-cover rounded-xl"
                  />

                  <div>

                    <h2 className="text-2xl font-bold">
                      {item.name}
                    </h2>

                    <p className="text-gray-500">
                      {item.brand}
                    </p>

                    <h3 className="text-blue-700 text-2xl font-bold mt-3">
                      ₹ {item.price}
                    </h3>

                  </div>

                </div>

                <div className="text-center">

                  <div className="flex gap-3 items-center justify-center">

                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="bg-gray-200 px-3 py-1 rounded"
                    >
                      -
                    </button>

                    <span className="font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item._id)}
                      className="bg-gray-200 px-3 py-1 rounded"
                    >
                      +
                    </button>

                  </div>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 mt-5"
                  >
                    <FaTrash size={20} />
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* RIGHT */}

          <div>

            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-28">

              <h2 className="text-3xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹ {subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? "FREE" : `₹ ${shipping}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>₹ {gst.toFixed(2)}</span>
                </div>

                <hr />

                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span>₹ {total.toFixed(2)}</span>
                </div>

                <Link to="/checkout" className="block w-full text-center mt-6 bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl text-lg">
                  Proceed to Checkout
                </Link>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Cart;