import { useState, useEffect } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    brand: "",
    category: "",
  });

  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await API.get("/categories");
      setCategories(data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    try {
      await API.post("/products", data);

      toast.success("Product Added Successfully");

      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        brand: "",
        category: "",
      });

    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-3xl font-bold mb-5">
        Add Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="name"
          placeholder="Product Name"
          className="w-full border p-2"
          onChange={handleChange}
          value={formData.name}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-2"
          onChange={handleChange}
          value={formData.description}
        />

        <input
          name="brand"
          placeholder="Brand"
          className="w-full border p-2"
          onChange={handleChange}
          value={formData.brand}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          className="w-full border p-2"
          onChange={handleChange}
          value={formData.price}
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          className="w-full border p-2"
          onChange={handleChange}
          value={formData.stock}
        />

        <select
          name="category"
          className="w-full border p-2"
          onChange={handleChange}
          value={formData.category}
        >
          <option value="">Select Category</option>

          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          multiple
          onChange={handleImage}
        />

        <button className="bg-blue-600 text-white px-5 py-2 rounded">
          Add Product
        </button>

      </form>
    </div>
  );
};

export default AddProduct;