import Brand from "../models/brand.model";
import { HTTP_STATUS } from "../constants/httpStatus";
import { BRAND_MESSAGES } from "../constants/messages";

const getAll = async () => {
  const brands = await Brand.find({}).sort({ createdAt: -1 });
  return {
    status: HTTP_STATUS.OK,
    data: brands,
  };
};

const getById = async (id: string) => {
  const brand = await Brand.findById(id);
  if (!brand) {
    throw {
      status: HTTP_STATUS.NOT_FOUND,
      message: BRAND_MESSAGES.NOT_FOUND,
    };
  }
  return { status: HTTP_STATUS.OK, data: brand };
};

const create = async (data: { brandName: string }) => {
  const brand = await Brand.create(data);
  return {
    status: HTTP_STATUS.CREATED,
    message: BRAND_MESSAGES.CREATED,
    data: brand,
  };
};

const update = async (id: string, data: { brandName: string }) => {
  const result = await Brand.findByIdAndUpdate(id, data, { new: true });
  if (!result) {
    throw {
      status: HTTP_STATUS.NOT_FOUND,
      message: BRAND_MESSAGES.NOT_FOUND,
    };
  }
  return {
    status: HTTP_STATUS.OK,
    message: BRAND_MESSAGES.UPDATED,
    data: result,
  };
};

const remove = async (id: string) => {
  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) {
    throw {
      status: HTTP_STATUS.NOT_FOUND,
      message: BRAND_MESSAGES.NOT_FOUND,
    };
  }
  return { status: HTTP_STATUS.OK, message: BRAND_MESSAGES.DELETED };
};

export { getAll, getById, create, update, remove };
