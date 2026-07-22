import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getCategoryById,
  updateCategory,
} from "../services/category.service";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    try {
      const data = await getCategoryById(id);

      setFormData({
        name: data.category.name,
        description: data.category.description || "",
      });

    } catch {
      toast.error("Failed to load category");
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
      await updateCategory(id, formData);

      toast.success("Category Updated");

      navigate("/manage-categories");

    } catch {
      toast.error("Update Failed");
    }
  };

  return (
    <div className="max-w-2xl py-10 mx-auto">

      <div className="p-8 bg-white shadow-lg rounded-2xl">

        <h1 className="mb-8 text-4xl font-bold">
          Edit Category
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Category Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full h-32 p-3 border rounded-xl"
          />

          <button
            className="px-8 py-3 text-white bg-blue-700 rounded-xl hover:bg-blue-800"
          >
            Update Category
          </button>

        </form>

      </div>

    </div>
  );
};

export default EditCategory;