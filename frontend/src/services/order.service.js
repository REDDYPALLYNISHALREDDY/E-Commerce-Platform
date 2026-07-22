import API from "../api/axios";

export const createOrder = async (orderData) => {
  const { data } = await API.post("/orders", orderData);
  return data;
};

export const getOrders = async () => {

    const { data } = await API.get("/orders");

    return data;

};