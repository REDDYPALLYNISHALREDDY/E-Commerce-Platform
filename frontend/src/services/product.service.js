import API from "../api/axios";

export const getProducts = async (keyword = "") => {
  const { data } = await API.get(`/products?keyword=${keyword}`);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await API.delete(`/products/${id}`);
  return data;
};

export const getProductById = async (id) => {
  const { data } = await API.get(`/products/${id}`);
  return data;
};

export const updateProduct = async (id, productData) => {
  const { data } = await API.put(`/products/${id}`, productData);
  return data;
};

export const getSingleProduct = async (id) => {
  const { data } = await API.get(`/products/${id}`);
  return data;
};