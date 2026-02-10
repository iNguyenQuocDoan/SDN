import { body, validationResult } from "express-validator";
import { HTTP_STATUS } from "../constants/httpStatus";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
    return;
  }
  next();
};

const registerValidate = [
  body("email").isEmail().withMessage("Email is invalid"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*]/)
    .withMessage(
      "Password must contain at least one special character (!@#$%^&*)",
    ),
  body("name").notEmpty().withMessage("Name is required"),
  body("YOB").isInt().withMessage("YOB must be a number"),
  body("gender").isString().withMessage("Gender must be a string"),
  handleValidationErrors,
] as any[];

const loginValidate = [
  body("email").isEmail().withMessage("Email is invalid"),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors,
] as any[];

export { registerValidate, loginValidate };
