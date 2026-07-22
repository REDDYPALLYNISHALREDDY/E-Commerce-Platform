import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

import {
  getCategories,
  deleteCategory,
} from "../services/category.service";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data.categories);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await deleteCategory(id);
      toast.success("Category Deleted");
      loadCategories();
    } catch {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="px-5 py-10 mx-auto max-w-7xl">

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-4xl font-bold">
          Manage Categories
        </h1>

        <Link
          to="/add-category"
          className="px-5 py-3 text-white bg-blue-700 rounded-xl hover:bg-blue-800"
        >
          + Add Category
        </Link>

      </div>

      <div className="overflow-hidden bg-white shadow rounded-2xl">

        <table className="w-full">

          <thead className="text-white bg-blue-700">

            <tr>
              <th className="p-4 text-left">Category</th>
              <th>Description</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {categories.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="py-10 text-center"
                >
                  No Categories Found
                </td>

              </tr>

            ) : (

              categories.map((category) => (

                <tr
                  key={category._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">
                    {category.name}
                  </td>

                  <td>
                    {category.description || "No Description"}
                  </td>


                  <td>
                    {new Date(category.createdAt).toLocaleDateString()}
                  </td>

                  <td>

                    <div className="flex justify-center gap-3">

                      <Link to={`/edit-category/${category._id}`} className="p-2 text-white bg-green-600 rounded-lg hover:bg-green-700">
                        <FaEdit />
                      </Link>

                      <button
                        onClick={() => handleDelete(category._id)}
                        className="p-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ManageCategories;