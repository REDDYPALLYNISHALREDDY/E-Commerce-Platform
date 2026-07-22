import API from "../api/axios";

// Get all categories
export const getCategories = async () => {
  const { data } = await API.get("/categories");
  return data;
};

// Create category
export const createCategory = async (categoryData) => {
  const { data } = await API.post("/categories", categoryData);
  return data;
};

// Delete category
export const deleteCategory = async (id) => {
  const { data } = await API.delete(`/categories/${id}`);
  return data;
};

// Get single category
export const getCategoryById = async (id) => {
  const { data } = await API.get(`/categories/${id}`);
  return data;
};

// Update category
export const updateCategory = async (id, categoryData) => {
  const { data } = await API.put(`/categories/${id}`, categoryData);
  return data;
};