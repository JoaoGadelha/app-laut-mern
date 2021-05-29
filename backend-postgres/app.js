const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Pool = require("pg").Pool;
require("dotenv").config();

// nao utilizar em producao. compromete a seguranca da aplicacao
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

const app = express();

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: "jvanggcqbsrbtt",
  host: "ec2-3-214-136-47.compute-1.amazonaws.com",
  database: "ddktvhalkn4d1g",
  password: "621daa6f2ada94f59fc6f7131aef99968d07cbb56900a90fd4f8d96b4492c151",
  port: 5432,
  ssl: true
});


app.get("/getUser", (req, res) => {
    pool.query("SELECT * FROM users", [], (error, results) => {
    if (error) {
      throw error;
    }

    res.status(200).json(results.rows);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running.`);
});
