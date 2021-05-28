import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className={styles.container}>
      <LoginForm />
      <div className={styles.linkBox}>
        <h1>Não possui uma conta? Crie aqui:</h1>
        <Link className={styles.Link} to="/signup">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Login;
