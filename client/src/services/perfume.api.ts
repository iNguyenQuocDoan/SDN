import http from "../lib/http";

const getAll = async (query?: { search?: string; brand?: string; page?: number; limit?: number }) => {
  try {
    const res = await http.get("/perfumes", { params: query });
    return res.data;
  } catch (err) {
    console.error("Error fetching perfumes: ", err);
    throw err;
  }
};

const getById = async (id: string) => {
  try {
    const res = await http.get(`/perfumes/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching perfume: ", err);
    throw err;
  }
};

const create = async (data: any) => {
  try {
    const res = await http.post("/perfumes", data);
    return res.data;
  } catch (err) {
    console.error("Error creating perfume: ", err);
    throw err;
  }
};

const update = async (id: string, data: any) => {
  try {
    const res = await http.put(`/perfumes/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Error updating perfume: ", err);
    throw err;
  }
};

const remove = async (id: string) => {
  try {
    const res = await http.delete(`/perfumes/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting perfume: ", err);
    throw err;
  }
};

const addComment = async (
  perfumeId: string,
  data: { rating: number; content: string },
) => {
  try {
    const res = await http.post(`/perfumes/${perfumeId}/comment`, data);
    return res.data;
  } catch (err) {
    console.error("Error adding comment: ", err);
    throw err;
  }
};

export { getAll, getById, create, update, remove, addComment };
