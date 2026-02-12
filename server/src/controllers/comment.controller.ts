import { Request, Response } from "express";
import * as commentService from "../services/comment.service";

const addComment = async (req: Request, res: Response) => {
  try {
    const result = await commentService.addComment(
      req.params.id as string,
      req.user._id,
      req.body,
    );
    res.status(result.status).json({ message: result.message });
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
export { addComment };
