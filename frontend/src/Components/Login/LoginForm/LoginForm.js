import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { postData } from "./postData";
import { Spinner } from "react-bootstrap";
import loading from "./loading.svg";

const LoginForm = () => {
  let [email, setEmail] = useState("");
  let [senha, setSenha] = useState("");
  let [alert, setAlert] = useState("");
  let [displayAlert, setDisplayAlert] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const onClickHandler = async () => {
    setDisplayAlert(false);
    setIsLoading(true);
    let url = "https://app-laut.herokuapp.com/authUser";
    let data = { email: email, senha: senha };
    let response = await postData(url, data);
    setIsLoading(false);
    if (response.message === "loggedin") {
      history.push("/getUser/" + response.clientID);
    } else {
      setDisplayAlert(true);
      if (response.message === "-3") {
        setAlert("Preencha ambos os campos");
      } else {
        if (response.message === "-1") {
          setAlert("Este usuário não existe");
        } else {
          if (response.message === "-2") {
            setAlert("O email ou senha não estão corretos");
          }
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite seu email..."
      ></input>
      <input
        type="password"
        className={styles.input}
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Digite sua senha..."
      ></input>
      {isLoading && (
        <div className={styles.imgContainer}>
          <img src={loading} style={{ width: "100px" }}></img>
        </div>
      )}
      {displayAlert && <h2 style={{ color: "red" }}>{alert}</h2>}
      <button className={styles.button} onClick={onClickHandler}>
        Login
      </button>
    </div>
  );
};

export default LoginForm;
