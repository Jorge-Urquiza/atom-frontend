import { User } from "../../shared/models/user";

export interface LoginData {
  token: string;
  user: User;
}
