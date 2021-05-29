import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./SignupForm.module.css";
import { postData } from "./postData";
import loading from "./loading.svg";

const LoginForm = () => {
  let [nome, setNome] = useState("");
  let [sobrenome, setSobrenome] = useState("");
  let [email, setEmail] = useState("");
  let [curso, setCurso] = useState("");
  let [senha, setSenha] = useState("");
  let [senha2, setSenha2] = useState("");
  let [alert, setAlert] = useState("");
  let [displayAlert, setDisplayAlert] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function validateEmail(mail) {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      )
    ) {
      return true;
    }
    return false;
  }

  const onClickHandler = async () => {
    setDisplayAlert(false);
    if (
      nome === "" ||
      sobrenome === "" ||
      email === "" ||
      curso === "" ||
      senha === "" ||
      senha2 === ""
    ) {
      setAlert("Por favor, preencha todos os campos");
      setDisplayAlert(true);
    } else {
      if (!validateEmail(email)) {
        setDisplayAlert(true);
        setAlert("Por favor, insira um e-mail válido");
      } else {
        if (senha.length < 8) {
          setDisplayAlert(true);
          setAlert("A senha deve conter mais de 8 caracteres");
        } else {
          if (senha != senha2) {
            setDisplayAlert(true);
            setAlert("Ambas as senhas devem ser iguais");
          } else {
            setIsLoading(true);
            let url = "https://app-laut.herokuapp.com/createUser";
            let data = {
              email: email,
              senha: senha,
              nome: nome,
              sobrenome: sobrenome,
              curso: curso,
            };
            await postData(url, data);
            setIsLoading(false);
            history.push("/login");
          }
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder="Insira seu nome..."
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      ></input>
      <input
        className={styles.input}
        placeholder="Insira seu sobrenome..."
        value={sobrenome}
        onChange={(e) => setSobrenome(e.target.value)}
      ></input>
      <input
        className={styles.input}
        placeholder="Insira seu curso..."
        value={curso}
        onChange={(e) => setCurso(e.target.value)}
      ></input>
      <input
        className={styles.input}
        placeholder="Insira seu email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        type="password"
        className={styles.input}
        placeholder="Insira sua senha..."
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      ></input>
      <input
        className={styles.input}
        type="password"
        placeholder="Insira novamente sua senha..."
        value={senha2}
        onChange={(e) => setSenha2(e.target.value)}
      ></input>{isLoading && (
        <div className={styles.imgContainer}>
          <img src={loading} style={{ width: "100px" }}></img>
        </div>
      )}
      {displayAlert && <h2 style={{ color: "red" }}>{alert}</h2>}
      <button className={styles.button} onClick={onClickHandler}>
        Signup
      </button>
    </div>
  );
};

export default LoginForm;
