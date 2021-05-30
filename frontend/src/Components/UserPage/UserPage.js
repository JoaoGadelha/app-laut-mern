import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./UserPage.module.css";

const UserPage = () => {
  let { id } = useParams();
  let [response, setResponse] = useState([]);

  useEffect(() => {
    // procura pelo usuario com id igual ao id encontrado na url
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf("/") + 1);
    (async () => {
      let serverRes = await fetch(
        "https://app-laut-pern.herokuapp.com/getUser/" + id
      );
      let jsonRes = await serverRes.json();
      setResponse(jsonRes[0]);
    })();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Olá, {response.nome}</h1>
      <h2>Estes são seus dados:</h2>
      <div className={styles.dadosUsuario}>
        <div>
          Nome: <p>{response.nome}</p>
        </div>
        <div>
          Sobrenome: <p>{response.sobrenome}</p>
        </div>
        <div>
          {" "}
          Email: <p>{response.email}</p>
        </div>
        <div>
          {" "}
          Curso: <p>{response.curso}</p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
