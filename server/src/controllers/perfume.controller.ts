import { Request, Response } from "express";
import * as perfumeService from "../services/perfume.service";
import { HTTP_STATUS } from "../constants/httpStatus";
import { AUTH_MESSAGES } from "../constants/messages";

const getAll = async (req: Request, res: Response) => {
  try {
    const result = await perfumeService.getAll(req.query);
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

const getById = async (req: Request, res: Response) => {
  try {
    const result = await perfumeService.getById(req.params.id as string);
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

const create = async (req: Request, res: Response) => {
  try {
    const result = await perfumeService.create(req.body);
    res.status(HTTP_STATUS.CREATED).json(result);
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

const update = async (req: Request, res: Response) => {
  try {
    const result = await perfumeService.update(
      req.params.id as string,
      req.body,
    );
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

const remove = async (req: Request, res: Response) => {
  try {
    const result = await perfumeService.remove(req.params.id as string);
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

export { getAll, create, getById, update, remove };
