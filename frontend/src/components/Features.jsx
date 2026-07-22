import {
  FaShippingFast,
  FaUndo,
  FaLock,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    icon: <FaShippingFast size={28} />,
    title: "Free Delivery",
    description: "Free shipping on orders over ₹500",
  },
  {
    icon: <FaUndo size={28} />,
    title: "Easy Returns",
    description: "30 days money-back guarantee",
  },
  {
    icon: <FaLock size={28} />,
    title: "Secure Payment",
    description: "100% secure payment",
  },
  {
    icon: <FaHeadset size={28} />,
    title: "24/7 Support",
    description: "Dedicated customer support",
  },
];

const Features = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-6 flex items-start gap-4"
          >
            <div className="bg-blue-100 text-blue-700 p-4 rounded-full">
              {item.icon}
            </div>

            <div>
              <h3 className="font-bold text-lg">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;