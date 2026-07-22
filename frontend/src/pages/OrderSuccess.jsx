import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-white rounded-2xl shadow-xl p-10 text-center">

        <h1 className="text-5xl text-green-600">
          ✅
        </h1>

        <h2 className="text-3xl font-bold mt-5">

          Order Placed Successfully

        </h2>

        <p className="text-gray-500 mt-4">

          Thank you for shopping with us.

        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-blue-700 text-white px-8 py-3 rounded-xl"
        >
          Continue Shopping
        </Link>

      </div>

    </div>
  );
};

export default OrderSuccess;