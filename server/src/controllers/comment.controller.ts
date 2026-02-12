import { Request, Response } from "express";
import * as commentService from "../services/comment.service";
import { HTTP_STATUS } from "../constants/httpStatus";
import { AUTH_MESSAGES } from "../constants/messages";

const addComment = async (req: Request, res: Response) => {
  try {
    const result = await commentService.addComment(
      req.params.id as string,
      req.user._id,
      req.body,
    );
    res.status(result.status).json({ message: result.message });
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
export { addComment };
