export const AUTH_MESSAGES = {
  REGISTER_SUCCESS: "Register successful",
  EMAIL_EXISTS: "Email already exists",
  INVALID_CREDENTIALS: "Invalid email or password",
  NO_TOKEN: "No token provided",
  INVALID_TOKEN: "Invalid token",
  USER_NOT_FOUND: "User not found",
  ADMIN_REQUIRED: "Admin access required",
} as const;

export const USER_MESSAGES = {
  UPDATE_SUCCESS: "Profile updated successfully",
  PASSWORD_CHANGED: "Password changed successfully",
  WRONG_PASSWORD: "Current password is incorrect",
} as const;

export const PERFUME_MESSAGES = {
  NOT_FOUND: "Perfume not found",
  CREATED: "Perfume created successfully",
  UPDATED: "Perfume updated successfully",
  DELETED: "Perfume deleted successfully",
} as const;

export const BRAND_MESSAGES = {
  NOT_FOUND: "Brand not found",
  CREATED: "Brand created successfully",
  UPDATED: "Brand updated successfully",
  DELETED: "Brand deleted successfully",
} as const;

export const COMMENT_MESSAGES = {
  ALREADY_COMMENTED: "You already commented on this perfume",
  CREATED: "Comment added successfully",
  UPDATED: "Comment updated successfully",
} as const;
