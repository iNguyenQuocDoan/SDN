import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Member from "../models/Member";
import { HTTP_STATUS } from "../constants/httpStatus";
import { AUTH_MESSAGES } from "../constants/messages";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: AUTH_MESSAGES.NO_TOKEN,
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    const user = await Member.findById(decoded.id).select("-password");

    if (!user) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: AUTH_MESSAGES.INVALID_TOKEN,
      });
      return;
    }

    (req as any).user = user;
    next();
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: AUTH_MESSAGES.INVALID_TOKEN,
    });
  }
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!(req as any).user.isAdmin) {
    res.status(HTTP_STATUS.FORBIDDEN).json({
      message: AUTH_MESSAGES.ADMIN_REQUIRED,
    });
    return;
  }
  next();
};

export { verifyToken, isAdmin };
