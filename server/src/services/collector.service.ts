import Member from "../models/member.model";
import { HTTP_STATUS } from "../constants/httpStatus";

const getAll = async () => {
  const members = await Member.find({})
    .select("-password")
    .sort({ createdAt: -1 });
  return {
    status: HTTP_STATUS.OK,
    data: members,
  };
};

export { getAll };
