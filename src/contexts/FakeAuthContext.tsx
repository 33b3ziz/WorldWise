import { createContext, useReducer } from "react";
import { AuthContextType } from "../types/AuthContextType";
import { User } from "../types/User";

const AuthContext = createContext<AuthContextType | null>(null);

type initial = {
  user: User | null;
  isAuth: boolean;
  error: string;
};

type Action = {
  type: string;
  payload?: User;
};

const initialState: initial = {
  user: null,
  isAuth: false,
  error: "",
};

function reducer(state: initial, action: Action): initial {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload as User,
        isAuth: true,
        error: "",
      };
    case "logout":
      return { ...state, user: null, isAuth: false, error: "" };
    case "error":
      return { ...state, error: "email or password is incorrect" };
    default:
      return state;
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ user, isAuth, error }, dispatch] = useReducer(reducer, initialState);

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    } else {
      dispatch({ type: "error" });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
