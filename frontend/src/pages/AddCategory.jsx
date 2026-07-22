import { useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/categories", {
        name,
        description,
      });

      toast.success(data.message || "Category Added");

      setName("");
      setDescription("");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to add category"
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow p-6 rounded">
      <h1 className="text-3xl font-bold mb-5">
        Add Category
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Category Name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;