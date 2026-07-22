import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const CategorySection = ({ category, products }) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-3xl font-bold">
            {category.name}
          </h2>

          <p className="mt-1 text-gray-500">
            {category.description}
          </p>
        </div>

        <Link
          to={`/category/${category._id}`}
          className="px-5 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800"
        >
          View All
        </Link>

      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}

      </div>
    </section>
  );
};

export default CategorySection;