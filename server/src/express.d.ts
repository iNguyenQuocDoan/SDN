import { IMember } from "../models/member.model";

declare module "express" {
  interface Request {
    user?: IMember;
  }
}
