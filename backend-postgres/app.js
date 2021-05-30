const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Pool = require("pg").Pool;
require("dotenv").config();

// nao utilizar em producao. compromete a seguranca da aplicacao
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: "jvanggcqbsrbtt",
  host: "ec2-3-214-136-47.compute-1.amazonaws.com",
  database: "ddktvhalkn4d1g",
  password: "621daa6f2ada94f59fc6f7131aef99968d07cbb56900a90fd4f8d96b4492c151",
  port: 5432,
  ssl: true,
});

// pesquisa os dados do usuario pelo seu id
app.get("/getUser/:id", (req, res) => {
  let id = req.params.id;
  pool.query("SELECT * FROM users WHERE id =" + id, [], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// autentica usuario
app.post("/authUser", (req, res) => {
  let email = String(req.body.email);
  let senha = String(req.body.senha);
  pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
    (error, results) => {
      if (error) {
        throw error;
      }
      
      console.log(senha === results.rows[0].senha)

      if (results.rows[0] !== undefined && senha === results.rows[0].senha) {
        return res.status(200).json({
          code: "loggedin",
          message: "Usuário autenticado com sucesso",
        });
      }

      if (results.rows.length === 0) {
        return res.json({
          code: "userdoesntexist",
          message: "Usuário não existe",
        });
      }

      if (results.rows[0] === undefined || senha !== results.rows[0].senha) {
        return res.json({
          code: "wrongpassword",
          message: "Usuario ou senha errados",
        });
      }
    }
  );
});

// cria usuario
app.post("/createUser", (req, res) => {
  let email = String(req.body.email);
  let senha = String(req.body.senha);
  let nome = String(req.body.nome);
  let sobrenome = String(req.body.sobrenome);
  let id = String(req.body.id);
  let curso = String(req.body.curso);

  pool.query(
    "INSERT INTO users (id,nome,sobrenome,email,senha,curso) VALUES ($1,$2,$3,$4,$5,$6)",
    [ id, nome, sobrenome, email, senha, curso],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.json(results)
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running.`);
});
