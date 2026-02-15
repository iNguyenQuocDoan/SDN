import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const registerSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain uppercase letter")
    .matches(/[a-z]/, "Must contain lowercase letter")
    .matches(/[0-9]/, "Must contain a number")
    .matches(/[!@#$%^&*]/, "Must contain a special character"),
  YOB: yup
    .number()
    .required("Year of birth is required")
    .min(1900, "Invalid year")
    .max(new Date().getFullYear(), "Invalid year"),
  gender: yup.boolean().required("Gender is required"),
});
