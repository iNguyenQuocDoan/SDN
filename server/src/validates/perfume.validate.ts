import { body } from "express-validator";
import { handleValidationErrors } from "../utils/handleValidation";

const createValidate = [
  body("perfumeName").notEmpty().withMessage("Perfume name is required"),
  body("uri").notEmpty().withMessage("Image URI is required"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("concentration")
    .notEmpty()
    .withMessage("Concentration is required")
    .isIn(["Extrait", "EDP", "EDT", "EDC", "Eau Fraiche"])
    .withMessage("Concentration must be Extrait, EDP, EDT, EDC or Eau Fraiche"),
  body("description").notEmpty().withMessage("Description is required"),
  body("ingredients").notEmpty().withMessage("Ingredients is required"),
  body("volume")
    .notEmpty()
    .withMessage("Volume is required")
    .isFloat({ min: 0 })
    .withMessage("Volume must be a positive number"),
  body("targetAudience")
    .notEmpty()
    .withMessage("Target audience is required")
    .isIn(["male", "female", "unisex"])
    .withMessage("Target audience must be male, female or unisex"),
  body("brand")
    .notEmpty()
    .withMessage("Brand is required")
    .isMongoId()
    .withMessage("Brand must be a valid ID"),
  handleValidationErrors,
] as any[];

const updateValidate = [
  body("perfumeName")
    .optional()
    .notEmpty()
    .withMessage("Perfume name cannot be empty"),
  body("uri").optional().notEmpty().withMessage("Image URI cannot be empty"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("concentration")
    .optional()
    .isIn(["Extrait", "EDP", "EDT", "EDC", "Eau Fraiche"])
    .withMessage("Concentration must be Extrait, EDP, EDT, EDC or Eau Fraiche"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description cannot be empty"),
  body("ingredients")
    .optional()
    .notEmpty()
    .withMessage("Ingredients cannot be empty"),
  body("volume")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Volume must be a positive number"),
  body("targetAudience")
    .optional()
    .isIn(["male", "female", "unisex"])
    .withMessage("Target audience must be male, female or unisex"),
  body("brand").optional().isMongoId().withMessage("Brand must be a valid ID"),
  handleValidationErrors,
] as any[];

export { createValidate, updateValidate };
