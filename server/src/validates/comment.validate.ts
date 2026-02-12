import { body } from "express-validator";
import { handleValidationErrors } from "../utils/handleValidation";

const addCommentValidate = [
  body("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isInt({ min: 1, max: 3 })
    .withMessage("Rating must be between 1 and 3"),
  body("content").notEmpty().withMessage("Content is required"),
  handleValidationErrors,
] as any[];

export { addCommentValidate };
