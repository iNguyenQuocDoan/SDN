import * as yup from "yup";

export const brandSchema = yup.object({
  brandName: yup.string().required("Brand name is required").trim(),
});
