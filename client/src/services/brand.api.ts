import http from "../lib/http";

const getAll = async () => {
  try {
    const res = await http.get("/brands");
    return res.data;
  } catch (err) {
    console.error("Error fetching brands: ", err);
    throw err;
  }
};

const getById = async (id: string) => {
  try {
    const res = await http.get(`/brands/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching brands: ", err);
    throw err;
  }
};

const create = async (data: { brandName: string }) => {
  try {
    const res = await http.post("/brands", data);
    return res.data;
  } catch (err) {
    console.error("Error creating brand: ", err);
    throw err;
  }
};

const update = async (id: string, data: { brandName: string }) => {
  try {
    const res = await http.put(`/brands/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Error updating brand: ", err);
    throw err;
  }
};

const remove = async (id: string) => {
  try {
    const res = await http.delete(`/brands/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting brand: ", err);
    throw err;
  }
};

export { getAll, getById, create, update, remove };
