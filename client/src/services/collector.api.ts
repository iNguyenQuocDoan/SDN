import http from "../lib/http";

const getAll = async () => {
  try {
    const res = await http.get("/collectors");
    return res.data;
  } catch (err) {
    console.error("Error fetching collectors: ", err);
    throw err;
  }
};

export { getAll };
