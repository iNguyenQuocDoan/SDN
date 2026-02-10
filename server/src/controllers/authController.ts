import { Request, Response } from "express";

import { HTTP_STATUS } from "../constants/httpStatus";
import * as authService from "../services/authService";

const register = async (req: Request, res: Response) => {
  try {
    const record = await authService.registerMember(req.body);
    res.status(record.status).json(record);
  } catch (err: any) {
    res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
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
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

export { register, login };
