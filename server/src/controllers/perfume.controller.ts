import { Request, Response } from "express";
import * as perfumeService from "../services/perfume.service";
import { HTTP_STATUS } from "../constants/httpStatus";

const getAll = async (req: Request, res: Response) => {
  try {
    const result = await perfumeService.getAll(req.query);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (err: any) {
    console.log(err);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: err.message || "Internal Server Error" });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const result = await perfumeService.getById(req.params.id as string);

    res.status(HTTP_STATUS.OK).json(result);
  } catch (err: any) {
    console.log(err);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: err.message || "Internal Server Error" });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const result = await perfumeService.create(req.body);

    res.status(HTTP_STATUS.CREATED).json(result);
  } catch (error) {
    console.log(error);

    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: (error as any).message || "Internal Server Error" });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const result = await perfumeService.update(
      req.params.id as string,
      req.body,
    );
    res.status(HTTP_STATUS.OK).json(result);
  } catch (err: any) {
    console.log(err);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: err.message || "Internal Server Error" });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const result = await perfumeService.remove(req.params.id as string);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (err: any) {
    console.log(err);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: err.message || "Internal Server Error" });
  }
};

export { getAll, create, getById, update, remove };
