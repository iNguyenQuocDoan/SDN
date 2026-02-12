import { Request, Response } from "express";

import { HTTP_STATUS } from "../constants/httpStatus";
import * as authService from "../services/auth.service";
import { AUTH_MESSAGES } from "../constants/messages";

const register = async (req: Request, res: Response) => {
  try {
    const record = await authService.registerMember(req.body);
    res.status(record.status).json(record);
  } catch (error: any) {
    if (error.status) {
      res.status(error.status).json({ message: error.message });
    } else {
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: AUTH_MESSAGES.INTERNAL_ERROR });
    }
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginMember(req.body);

    //cookie
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(HTTP_STATUS.OK).json(result);
  } catch (error: any) {
    if (error.status) {
      res.status(error.status).json({ message: error.message });
    } else {
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: AUTH_MESSAGES.INTERNAL_ERROR });
    }
  }
};

const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(HTTP_STATUS.OK).json({ message: AUTH_MESSAGES.LOG_OUT_SUCCESS });
};

export { register, login, logout };
