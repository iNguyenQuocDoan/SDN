import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HTTP_STATUS } from "../constants/httpStatus";
import { AUTH_MESSAGES } from "../constants/messages";

import { verifyFirebaseToken } from "../lib/firebase";
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
    const isOAuthAccount = emailExists.YOB === 0;
    throw {
      status: HTTP_STATUS.BAD_REQUEST,
      message: isOAuthAccount
        ? AUTH_MESSAGES.EMAIL_REGISTERED_VIA_GOOGLE
        : AUTH_MESSAGES.EMAIL_EXISTS,
    };
  }

  const hashPassword = await bcrypt.hash(data.password, 10);

  const newRecord = new Member({ ...data, password: hashPassword });
  await newRecord.save();

  return {
    status: HTTP_STATUS.CREATED,
    message: AUTH_MESSAGES.REGISTER_SUCCESS,
    data: {
      _id: newRecord._id,
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
    data: {
      _id: record._id,
      email: record.email,
      name: record.name,
      YOB: record.YOB,
      gender: record.gender,
      isAdmin: record.isAdmin,
    },
  };
};

const firebaseLogin = async (idToken: string) => {
  const { email, name } = await verifyFirebaseToken(idToken);

  let member = await Member.findOne({ email });

  if (!member) {
    // Create new member for OAuth users with placeholder values
    const randomPassword = await bcrypt.hash(
      Math.random().toString(36) + Date.now(),
      10,
    );
    member = await new Member({
      email,
      name,
      password: randomPassword,
      YOB: 0,
      gender: false,
    }).save();
  }

  const token = jwt.sign(
    { id: member._id, email: member.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" },
  );

  return {
    status: HTTP_STATUS.OK,
    message: AUTH_MESSAGES.LOGIN_SUCCESS,
    token,
    data: {
      _id: member._id,
      email: member.email,
      name: member.name,
      YOB: member.YOB,
      gender: member.gender,
      isAdmin: member.isAdmin,
    },
  };
};

export { registerMember, loginMember, firebaseLogin };
