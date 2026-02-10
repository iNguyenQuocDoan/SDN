import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { HTTP_STATUS } from "../constants/httpStatus";

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
    return;
  }
  next();
};
