import http from "../lib/http";

const register = async (data: {
  name: string;
  email: string;
  password: string;
  YOB: number;
  gender: boolean;
}) => {
  const res = await http.post("/auth/register", data);
  return res.data;
};

const login = async (data: { email: string; password: string }) => {
  const res = await http.post("/auth/login", data);
  return res.data;
};

const logout = async () => {
  const res = await http.post("/auth/logout");
  return res.data;
};

export { register, login, logout };
