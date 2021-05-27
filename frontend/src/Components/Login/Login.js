import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className={styles.container}>
      <LoginForm />
      <Link to="/signup">Signup</Link>
    </div>
  );
};

export default Login;
