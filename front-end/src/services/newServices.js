import * as httpRequest from "../utils/httpRequest";

export const getAllNews = async (page = 1, limit = 5) => {
  try {
    const response = await httpRequest.get(
      `news?page=${page}&limit=${limit}`
    );
    return response;
  } catch (error) {
    console.error("Error getAllNews", error);
    return { news: [], totalPages: 1 };
  }
};

export const getNewById = async (id) => {
  try {
    return await httpRequest.get(`news/${id}`);
  } catch (error) {
    console.error("Error getNewById", error);
    return null;
  }
};

export const createNew = async (formData) => {
  try {
    const isFormData = formData instanceof FormData;
    return await httpRequest.post("news", formData, {
      headers: isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error createNew", error);
    return null;
  }
};

export const updateNew = async (id, formData) => {
  try {
    return await httpRequest.patch(`news/${id}`, formData);
  } catch (error) {
    console.error("Error updateNew", error);
    return null;
  }
};

export const deleteNew = async (id) => {
  try {
    return await httpRequest.del(`news/${id}`);
  } catch (error) {
    console.error("Error deleteNew", error);
    return null;
  }
};
