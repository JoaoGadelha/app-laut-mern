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
    // acessa banco de dados no mondogb atlas
    //let url = "https://app-laut.herokuapp.com/authUser";

    let url = "https://app-laut-pern.herokuapp.com/authUser";
    let data = { email: email, senha: senha };
    let response = await postData(url, data);
    setIsLoading(false);
    if (response.code === "loggedin") {
      console.log(response);
      history.push("/getUser/" + response.id);
    } else {
      setDisplayAlert(true);
      if (email === "" || senha === "") {
        setAlert("Preencha ambos os campos");
      } else {
        if (response.code === "userdoesntexist") {
          setAlert("Este usuário não existe");
        } else {
          if (response.code === "wrongpassword") {
            setAlert("O email ou senha não estão corretos");
          } else {
            if (response === 503) {
              setAlert(
                "O servidor está em manutenção. Tente novamente mais tarde"
              );
            }
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
