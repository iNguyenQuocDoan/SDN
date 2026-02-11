import { body } from "express-validator";
import { handleValidationErrors } from "../utils/handleValidation";

const updateProfileValidate = [
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("YOB").optional().isInt().withMessage("YOB must be a number"),
  body("gender").optional().isBoolean().withMessage("Gender must be boolean"),
  handleValidationErrors,
] as any[];

const changePasswordValidate = [
  body("oldPassword").notEmpty().withMessage("Old password is required"),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain at least one special character"),
  handleValidationErrors,
] as any[];

export { updateProfileValidate, changePasswordValidate };
