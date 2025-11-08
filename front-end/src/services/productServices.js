// services/productService.js
import * as httpRequest from "../utils/httpRequest";

export const getAllProducts = async () => {
  try {
    const response = await httpRequest.get("products");
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error getAllProducts", error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await httpRequest.get(`products/${id}`);
    return response;
  } catch (error) {
    console.error("Error getProductById", error);
    return null;
  }
};

export const createProduct = async (productData) => {
  try {
    const formData = new FormData();
    for (let key in productData) {
      formData.append(key, productData[key]);
    }
    const response = await httpRequest.post("products", formData);
    return response;
  } catch (error) {
    console.error("Error createProduct", error);
    return null;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await httpRequest.put(`products/${id}`, productData);
    return response;
  } catch (error) {
    console.error("Error updateProduct", error);
    return null;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await httpRequest.del(`products/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleteProduct", error);
    return null;
  }
};
