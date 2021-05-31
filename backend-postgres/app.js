const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Pool = require("pg").Pool;
require("dotenv").config();

// do not use in production
// bypasses SSL/TSL verification
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl: true,
});

// break these 3 routes into their own .js files

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

      if (results.rows[0] !== undefined && senha === results.rows[0].senha) {
        return res.status(200).json({
          code: "loggedin",
          message: "Usuário autenticado com sucesso",
          id: results.rows[0].id
        });
      }

      if (results.rows[0] === undefined) {
        return res.json({
          code: "userdoesntexist",
          message: "Usuário não existe",
        });
      }

      if (senha !== results.rows[0].senha) {
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
  let id = Math.floor(Math.random() * 1000000);
  let curso = String(req.body.curso);

  pool.query(
    "INSERT INTO users (id,nome,sobrenome,email,senha,curso) VALUES ($1,$2,$3,$4,$5,$6)",
    [id, nome, sobrenome, email, senha, curso],
    (error, results) => {
      if (error) {
        throw error;
      }
      return res.json(results.rows);
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running.`);
});
