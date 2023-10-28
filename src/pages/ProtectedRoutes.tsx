import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const { isAuth } = useAuth()!;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate("/");
  }, [isAuth, navigate]);

  return isAuth ? children : null;
}

export default ProtectedRoutes;
