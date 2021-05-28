import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { postData } from "./postData";

const LoginForm = () => {
  let [email, setEmail] = useState("");
  let [senha, setSenha] = useState("");
  let [alert, setAlert] = useState("");
  let [displayAlert, setDisplayAlert] = useState(false);
  const history = useHistory();

  const onClickHandler = async () => {
    let url = "https://app-laut.herokuapp.com/authUser";
    let data = { email: email, senha: senha };
    let response = await postData(url, data);
    if (response.message === "loggedin") {
      history.push("/getUser/" + response.clientID);
    } else {
      setDisplayAlert(true);
      if(response.message === '-3') {
        setAlert('Preencha ambos os campos')
      } else{
        if(response.message === '-1') {
          setAlert('Este usuário não existe')
        } else {
          if(response.message === '-2') {
            setAlert('O email ou senha não estão corretos')
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
      <button className={styles.button} onClick={() => onClickHandler()}>
        Login
      </button>
      {displayAlert && <h2 style={{ color: "red" }}>{alert}</h2>}
    </div>
  );
};

export default LoginForm;
