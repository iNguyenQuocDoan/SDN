import { Request, Response } from "express";

import { HTTP_STATUS } from "../constants/httpStatus";
import * as authService from "../services/authService";

const register = async (req: Request, res: Response) => {
  try {
    const record = await authService.registerMember(req.body);
    res.status(record.status).json(record);
  } catch (err: any) {
    console.log(err);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

export { register };
