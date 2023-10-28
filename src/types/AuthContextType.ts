import { User } from "./User";

export type AuthContextType = {
  user: User | null;
  isAuth: boolean;
  error: string;
  login: (email: string, password: string) => void;
  logout: () => void;
};
