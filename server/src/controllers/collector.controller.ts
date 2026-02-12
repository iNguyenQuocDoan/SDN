import { Request, Response } from "express";
import * as collectorService from "../services/collector.service";
import { HTTP_STATUS } from "../constants/httpStatus";
import { AUTH_MESSAGES } from "../constants/messages";

const getAll = async (req: Request, res: Response) => {
  try {
    const result = await collectorService.getAll();
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

export { getAll };
