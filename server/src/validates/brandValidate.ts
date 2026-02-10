import { body } from "express-validator";
import { handleValidationErrors } from "../utils/handleValidation";

const createValidate = [
  body("brandName")
    .notEmpty()
    .withMessage("Brand name is required")
    .isString()
    .withMessage("Brand name must be a string"),
  handleValidationErrors,
] as any[];

const updateValidate = [
  body("brandName")
    .notEmpty()
    .withMessage("Brand name is required")
    .isString()
    .withMessage("Brand name must be a string"),
  handleValidationErrors,
] as any[];

export { createValidate, updateValidate };
