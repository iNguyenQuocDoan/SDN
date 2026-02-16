import Perfume from "../models/perfume.model";
import { HTTP_STATUS } from "../constants/httpStatus";
import { PERFUME_MESSAGES } from "../constants/messages";

const getAll = async (query: any) => {
  const { search, brand, page = 1, limit = 8 } = query;

  //Start filter
  const filter: any = {};
  if (brand) {
    filter.brand = brand;
  }
  //End filter

  //Start search
  if (search) {
    filter.perfumeName = { $regex: search, $options: "i" };
  }
  //End search

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));
  const skip = (pageNum - 1) * limitNum;

  const [result, total] = await Promise.all([
    Perfume.find(filter)
      .populate("brand")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    Perfume.countDocuments(filter),
  ]);

  return {
    status: HTTP_STATUS.OK,
    data: result,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  };
};

const getById = async (id: string) => {
  const result = await Perfume.findById(id)
    .populate("brand")
    .populate("comments.author", "name email");

  if (!result) {
    throw {
      status: HTTP_STATUS.NOT_FOUND,
      message: PERFUME_MESSAGES.NOT_FOUND,
    };
  }

  return {
    status: HTTP_STATUS.OK,
    data: result,
  };
};

const create = async (data: any) => {
  const record = await Perfume.create(data);
  return {
    status: HTTP_STATUS.CREATED,
    message: PERFUME_MESSAGES.CREATED,
    data: record,
  };
};

const update = async (id: string, data: any) => {
  const record = await Perfume.findByIdAndUpdate(id, data, { new: true });

  if (!record) {
    throw {
      status: HTTP_STATUS.NOT_FOUND,
      message: PERFUME_MESSAGES.NOT_FOUND,
    };
  }

  return {
    status: HTTP_STATUS.OK,
    message: PERFUME_MESSAGES.UPDATED,
    data: record,
  };
};

const remove = async (id: string) => {
  const record = await Perfume.findByIdAndDelete(id);

  if (!record) {
    throw {
      status: HTTP_STATUS.NOT_FOUND,
      message: PERFUME_MESSAGES.NOT_FOUND,
    };
  }

  return {
    status: HTTP_STATUS.OK,
    message: PERFUME_MESSAGES.DELETED,
  };
};

export { getAll, getById, create, update, remove };
