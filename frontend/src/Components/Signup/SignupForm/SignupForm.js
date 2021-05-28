import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./SignupForm.module.css";
import { postData } from "./postData";

const LoginForm = () => {
  let [nome, setNome] = useState("");
  let [sobrenome, setSobrenome] = useState("");
  let [email, setEmail] = useState("");
  let [curso, setCurso] = useState("");
  let [senha, setSenha] = useState("");
  let [senha2, setSenha2] = useState("");
  const history = useHistory();

  const onClickHandler = async () => {
    let url = "https://app-laut.herokuapp.com/createUser";
    let data = {
      email: email,
      senha: senha,
      nome: nome,
      sobrenome: sobrenome,
      curso: curso,
    };
    if (senha === senha2) {
      let response = await postData(url, data);
      history.push("/login");
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
      ></input>
      <button className={styles.button} onClick={onClickHandler}>
        Signup
      </button>
    </div>
  );
};

export default LoginForm;
