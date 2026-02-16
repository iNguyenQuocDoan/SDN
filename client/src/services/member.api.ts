import http from "../lib/http";

const getProfile = async () => {
  try {
    const res = await http.get("/me");
    return res.data;
  } catch (err) {
    console.error("Error fetching profile: ", err);
    throw err;
  }
};

const updateProfile = async (data: {
  name?: string;
  YOB?: number;
  gender?: boolean;
}) => {
  try {
    const res = await http.put("/me/profile", data);
    return res.data;
  } catch (err) {
    console.error("Error updating profile: ", err);
    throw err;
  }
};

const changePassword = async (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  try {
    const res = await http.put("/me/change-password", data);
    return res.data;
  } catch (err) {
    console.error("Error changing password: ", err);
    throw err;
  }
};

export { getProfile, updateProfile, changePassword };
