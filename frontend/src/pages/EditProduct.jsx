import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getProductById,
  updateProduct,
} from "../services/product.service";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);

      setFormData({
        name: data.product.name,
        description: data.product.description,
        brand: data.product.brand,
        price: data.product.price,
        stock: data.product.stock,
      });

    } catch {
      toast.error("Failed to load product");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProduct(id, formData);

      toast.success("Product Updated");

      navigate("/manage-products");

    } catch {
      toast.error("Update Failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-8">
          Edit Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full border rounded-xl p-3"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border rounded-xl p-3 h-32"
          />

          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="w-full border rounded-xl p-3"
          />

          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border rounded-xl p-3"
          />

          <input
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full border rounded-xl p-3"
          />

          <button
            className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl"
          >
            Update Product
          </button>

        </form>

      </div>

    </div>
  );
};

export default EditProduct;