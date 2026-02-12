import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatus";
import { AUTH_MESSAGES } from "../constants/messages";
import * as brandService from "../services/brand.service";

const getAll = async (req: Request, res: Response) => {
  try {
    const result = await brandService.getAll();
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
    const result = await brandService.getById(req.params.id as string);
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
    const result = await brandService.create(req.body);
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
    const result = await brandService.update(req.params.id as string, req.body);
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
    const result = await brandService.remove(req.params.id as string);
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

export { getAll, getById, create, update, remove };
