import { Request, Response } from "express";
import * as memberService from "../services/member.service";
import { HTTP_STATUS } from "../constants/httpStatus";
import { AUTH_MESSAGES, USER_MESSAGES } from "../constants/messages";

const getProfile = async (req: Request, res: Response) => {
  try {
    const result = await memberService.getProfile(req.user._id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (err: any) {
    console.log(err);
    res
      .status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: err.message || AUTH_MESSAGES.INTERNAL_ERROR });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const result = await memberService.updateProfile(req.user._id, req.body);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (error: any) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: AUTH_MESSAGES.INTERNAL_ERROR });
  }
};

const changePassword = async (req: Request, res: Response) => {
  try {
    const result = await memberService.changePassword(req.user._id, req.body);

    res.status(HTTP_STATUS.OK).json(result);
  } catch (error: any) {
    res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: USER_MESSAGES.WRONG_PASSWORD });
  }
};

export { getProfile, updateProfile, changePassword };
