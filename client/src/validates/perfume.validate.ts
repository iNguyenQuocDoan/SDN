import * as yup from "yup";

export const perfumeSchema = yup.object({
  perfumeName: yup.string().required("Perfume name is required").trim(),
  uri: yup.string().required("Image URL is required").trim(),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be greater than 0"),
  volume: yup
    .number()
    .required("Volume is required")
    .positive("Volume must be greater than 0"),
  concentration: yup
    .string()
    .required("Concentration is required")
    .oneOf(["Extrait", "EDP", "EDT", "EDC", "Eau Fraiche"]),
  targetAudience: yup
    .string()
    .required("Target audience is required")
    .oneOf(["male", "female", "unisex"]),
  brand: yup.string().required("Brand is required"),
  ingredients: yup.string().required("Ingredients is required").trim(),
  description: yup.string().required("Description is required").trim(),
});
