import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const navigateToLoginPage = () => {};

  return (
    <div className={styles.container}>
      <h1>Página principal</h1>
      <h2>Faça seu login:</h2>
      <div className={styles.linkContainer}>
        <Link to="/login" className={styles.Link}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
