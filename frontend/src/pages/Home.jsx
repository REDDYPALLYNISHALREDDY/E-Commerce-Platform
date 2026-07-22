import { useEffect, useState } from "react";

import CategorySection from "../components/CategorySection";

import { getProducts } from "../services/product.service";

import { getCategories } from "../services/category.service";

import Hero from "../components/Hero";

import Features from "../components/Features";

import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState([]);
  
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";

  useEffect(() => {
    fetchProducts();
  }, [keyword]);

  const fetchProducts = async () => {
    try {
      const categoryData = await getCategories();
      setCategories(categoryData.categories);

      const productData = await getProducts(keyword);
      setProducts(productData.products);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <h1 className="mt-20 text-2xl text-center">
        Loading Products...
      </h1>
    );
  }

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl">
        <>
            <Hero />

            <Features />

            <div className="px-5 mx-auto max-w-7xl">

                ...

            </div>

        </>
      <div className="space-y-20">

        {categories.map((category) => {

          const categoryProducts = products.filter(

            (product) =>

              product.category?._id === category._id

          );

          return (

            <CategorySection

              key={category._id}

              category={category}

              products={categoryProducts.slice(0, 4)}

            />

          );

        })}

      </div>
    </div>
  );
};

export default Home;