import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Message from "../components/Message";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const { login, isAuth, error } = useAuth()!;
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  useEffect(() => {
    if (isAuth) navigate("/app", { replace: true });
  }, [navigate, isAuth]);

  return (
    <main className={styles.login}>
      {error ? <Message message={error} /> : null}
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
