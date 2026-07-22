import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useCart } from "../context/CartContext";
import { createOrder } from "../services/order.service";

const Checkout = () => {

  const navigate = useNavigate();

  const { cartItems, clearCart } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 1000 ? 0 : 99;

  const tax = subtotal * 0.18;

  const total = subtotal + shipping + tax;

  const [formData, setFormData] = useState({

    fullName: "",

    phone: "",

    address: "",

    city: "",

    state: "",

    pincode: "",

    paymentMethod: "COD",

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (cartItems.length === 0) {

      return toast.error("Cart is empty");

    }

    try {

      const orderData = {

        orderItems: cartItems.map(item => ({

          product: item._id,

          name: item.name,

          image: item.images[0],

          quantity: item.quantity,

          price: item.price,

        })),

        shippingAddress: {

          fullName: formData.fullName,

          phone: formData.phone,

          address: formData.address,

          city: formData.city,

          state: formData.state,

          pincode: formData.pincode,

        },

        paymentMethod: formData.paymentMethod,

        itemsPrice: subtotal,

        shippingPrice: shipping,

        taxPrice: tax,

        totalPrice: total,

      };

      const data = await createOrder(orderData);

      toast.success(data.message);

      clearCart();

      navigate("/order-success");

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Order Failed"

      );

    }

  };

  return (

    <div className="max-w-7xl mx-auto py-10 px-5">

      <h1 className="text-5xl font-bold mb-10">

        Checkout

      </h1>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* LEFT */}

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 bg-white shadow-lg rounded-2xl p-8 space-y-5"
        >

          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <textarea
            name="address"
            placeholder="Complete Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 h-28"
          />

          <div className="grid md:grid-cols-3 gap-4">

            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

            <input
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

            <input
              name="pincode"
              placeholder="PIN Code"
              value={formData.pincode}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

          </div>

          <div className="space-y-3">

            <h2 className="text-xl font-semibold">
              Payment Method
            </h2>

            <label className="flex items-center gap-3">

              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={formData.paymentMethod === "COD"}
                onChange={handleChange}
              />

              Cash on Delivery

            </label>

            <label className="flex items-center gap-3">

              <input
                type="radio"
                name="paymentMethod"
                value="ONLINE"
                checked={formData.paymentMethod === "ONLINE"}
                onChange={handleChange}
              />

              Online Payment (Coming Soon)

            </label>

          </div>

          <button
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl text-lg"
          >
            Place Order
          </button>

        </form>
                {/* RIGHT */}

        <div>

          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-28">

            <h2 className="text-3xl font-bold mb-6">

              Order Summary

            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">

                <span>Items</span>

                <span>{cartItems.length}</span>

              </div>

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

                <span>GST</span>

                <span>

                  ₹ {tax.toFixed(2)}

                </span>

              </div>

              <hr />

              <div className="flex justify-between text-2xl font-bold">

                <span>Total</span>

                <span>

                  ₹ {total.toFixed(2)}

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Checkout;