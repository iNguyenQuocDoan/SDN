import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HTTP_STATUS } from "../constants/httpStatus";
import { AUTH_MESSAGES } from "../constants/messages";

import Member from "../models/Member";

const registerMember = async (data: {
  email: string;
  password: string;
  name: string;
  YOB: number;
  gender: boolean;
}) => {
  const emailExists = await Member.findOne({ email: data.email });
  if (emailExists) {
    return {
      status: HTTP_STATUS.BAD_REQUEST,
      message: AUTH_MESSAGES.EMAIL_EXISTS,
    };
  }

  const hashPassword = await bcrypt.hash(data.password, 10);

  const newRecord = new Member({ ...data, password: hashPassword });
  await newRecord.save();

  return {
    status: HTTP_STATUS.CREATED,
    message: AUTH_MESSAGES.REGISTER_SUCCESS,
    data: newRecord,
  };
};

export { registerMember };
