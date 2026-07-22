import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";

import { getProducts } from "../services/product.service";

import Hero from "../components/Hero";

import Features from "../components/Features";

import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";

  useEffect(() => {
    fetchProducts();
  }, [keyword]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts(keyword);

      setProducts(data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <h1 className="text-center text-2xl mt-20">
        Loading Products...
      </h1>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
        <>
            <Hero />

            <Features />

            <div className="max-w-7xl mx-auto px-5">

                ...

            </div>

        </>
      <div className="flex justify-between items-center mb-8">
        <div>
            <h2 className="text-5xl font-bold">
                Latest Products
            </h2>

            <p className="text-gray-500 mt-3">
                Discover trending products with amazing deals.
            </p>
        </div>

        <button className="bg-blue-700 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition">
            View All
        </button>
    </div>

      {products.length === 0 ? (
        <h2>No Products Found</h2>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;