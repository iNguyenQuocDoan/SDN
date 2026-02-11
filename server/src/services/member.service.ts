import bcrypt from "bcrypt";

import { HTTP_STATUS } from "../constants/httpStatus";
import { USER_MESSAGES } from "../constants/messages";
import Member from "../models/member.model";

const getProfile = async (userId: string) => {
  const result = await Member.findById(userId).select("-password");

  if (!result) {
    throw {
      status: HTTP_STATUS.NOT_FOUND,
      message: USER_MESSAGES.NOT_FOUND,
    };
  }
  return { status: HTTP_STATUS.OK, data: result };
};

const updateProfile = async (
  userId: string,
  data: { name?: string; YOB?: number; gender?: boolean },
) => {
  const allowedUpdates: any = {};
  if (data.name !== undefined) allowedUpdates.name = data.name;
  if (data.YOB !== undefined) allowedUpdates.YOB = data.YOB;
  if (data.gender !== undefined) allowedUpdates.gender = data.gender;

  const member = await Member.findByIdAndUpdate(userId, allowedUpdates, {
    new: true,
  }).select("-password");

  if (!member) {
    throw {
      status: HTTP_STATUS.NOT_FOUND,
      message: USER_MESSAGES.NOT_FOUND,
    };
  }
  return {
    status: HTTP_STATUS.OK,
    message: USER_MESSAGES.UPDATE_SUCCESS,
    data: member,
  };
};

const changePassword = async (
  userId: string,
  data: { oldPassword: string; newPassword: string },
) => {
  const member = await Member.findById(userId);
  if (!member) {
    throw {
      status: HTTP_STATUS.NOT_FOUND,
      message: USER_MESSAGES.NOT_FOUND,
    };
  }

  const isMatch = await bcrypt.compare(data.oldPassword, member.password);
  if (!isMatch) {
    throw {
      status: HTTP_STATUS.BAD_REQUEST,
      message: USER_MESSAGES.WRONG_PASSWORD,
    };
  }

  member.password = await bcrypt.hash(data.newPassword, 10);
  await member.save();

  return {
    status: HTTP_STATUS.OK,
    message: USER_MESSAGES.PASSWORD_CHANGED,
  };
};

export { getProfile, updateProfile, changePassword };
