import { HTTP_STATUS } from "../constants/httpStatus";
import { COMMENT_MESSAGES, PERFUME_MESSAGES } from "../constants/messages";
import Perfume from "../models/perfume.model";

const addComment = async (
  perfumeId: string,
  userId: string,
  data: { rating: number; content: string },
  isAdmin: boolean,
) => {
  if (isAdmin) {
    throw {
      status: HTTP_STATUS.FORBIDDEN,
      message: PERFUME_MESSAGES.ADMIN_NO_COMMENT,
    };
  }

  const perfume = await Perfume.findById(perfumeId);

  if (!perfume) {
    throw {
      status: HTTP_STATUS.NOT_FOUND,
      message: PERFUME_MESSAGES.NOT_FOUND,
    };
  }

  if (perfume.isDeleted) {
    throw {
      status: HTTP_STATUS.BAD_REQUEST,
      message: PERFUME_MESSAGES.DELETED_NO_COMMENT,
    };
  }

  const existComment = perfume.comments.find(
    (comment: any) => comment.author.toString() === userId.toString(),
  );
  if (existComment) {
    throw {
      status: HTTP_STATUS.BAD_REQUEST,
      message: PERFUME_MESSAGES.EXIST_COMMENT,
    };
  }

  perfume.comments.push({
    rating: data.rating,
    content: data.content,
    author: userId as any,
  });
  await perfume.save();

  return {
    status: HTTP_STATUS.CREATED,
    message: COMMENT_MESSAGES.CREATED,
  };
};

export { addComment };
