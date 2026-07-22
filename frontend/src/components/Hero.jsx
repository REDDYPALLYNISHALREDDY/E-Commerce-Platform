import { FaShoppingBag } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto mt-8 px-5">

      <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white">

        <div className="grid lg:grid-cols-2 items-center">

          {/* Left */}

          <div className="p-12">

            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">

              🔥 Trending Collection

            </span>

            <h1 className="text-6xl font-bold leading-tight mt-8">

              Discover the Best Products

            </h1>

            <p className="mt-6 text-lg text-blue-100 leading-8">

              Shop premium electronics, fashion,
              accessories and more at unbelievable
              prices with fast delivery.

            </p>

            <div className="flex gap-5 mt-10">

              <button className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:scale-105 duration-300">

                Shop Now

              </button>

              <button className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-700 duration-300">

                Explore Deals

              </button>

            </div>

          </div>

          {/* Right */}

          <div className="hidden lg:flex justify-center">

            <img
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=900"
              alt="Shopping"
              className="w-[500px] h-[400px] object-cover rounded-l-full"
            />

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;