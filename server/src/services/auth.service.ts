import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HTTP_STATUS } from "../constants/httpStatus";
import { AUTH_MESSAGES } from "../constants/messages";

import Member from "../models/member.model";

const registerMember = async (data: {
  email: string;
  password: string;
  name: string;
  YOB: number;
  gender: boolean;
}) => {
  const emailExists = await Member.findOne({ email: data.email });
  if (emailExists) {
    throw {
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
    data: {
      id: newRecord._id,
      email: newRecord.email,
      name: newRecord.name,
      YOB: newRecord.YOB,
      gender: newRecord.gender,
    },
  };
};

const loginMember = async (data: { email: string; password: string }) => {
  const record = await Member.findOne({ email: data.email });
  if (!record) {
    throw {
      status: HTTP_STATUS.UNAUTHORIZED,
      message: AUTH_MESSAGES.INVALID_CREDENTIALS,
    };
  }

  const recordExist = await bcrypt.compare(data.password, record.password);
  if (!recordExist) {
    throw {
      status: HTTP_STATUS.UNAUTHORIZED,
      message: AUTH_MESSAGES.INVALID_CREDENTIALS,
    };
  }

  const token = jwt.sign(
    {
      id: record._id,
      email: record.email,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" },
  );

  return {
    status: HTTP_STATUS.OK,
    message: AUTH_MESSAGES.LOGIN_SUCCESS,
    token,
    record: {
      id: record._id,
      email: record.email,
      name: record.name,
      YOB: record.YOB,
      gender: record.gender,
    },
  };
};

export { registerMember, loginMember };
