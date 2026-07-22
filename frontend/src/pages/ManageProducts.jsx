import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

import {
  getProducts,
  deleteProduct,
} from "../services/product.service";

const ManageProducts = () => {

  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.products);
    } catch {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);

      toast.success("Product Deleted");

      loadProducts();

    } catch {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Manage Products
        </h1>

        <Link
          to="/add-product"
          className="bg-blue-700 text-white px-5 py-3 rounded-xl hover:bg-blue-800"
        >
          + Add Product
        </Link>

      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-700 text-white">

            <tr>

              <th className="p-4 text-left">Image</th>

              <th>Name</th>

              <th>Brand</th>

              <th>Price</th>

              <th>Stock</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-3">

                  <img
                    src={
                      product.images.length
                        ? `http://localhost:5000${product.images[0]}`
                        : "https://via.placeholder.com/60"
                    }
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />

                </td>

                <td>{product.name}</td>

                <td>{product.brand}</td>

                <td>₹ {product.price}</td>

                <td>{product.stock}</td>

                <td>

                  <div className="flex gap-3">

                    <Link
                      to={`/edit-product/${product._id}`}
                      className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                    >
                      <FaEdit />
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(product._id)
                      }
                      className="bg-red-600 text-white p-2 rounded-lg"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ManageProducts;