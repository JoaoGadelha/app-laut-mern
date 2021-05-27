const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const shutDown = require("./shutdown");
let createUser = require("./routes/createUser");
let authUser = require("./routes/authUser");
let getUser = require("./routes/getUser");

//middlewares
app.use(cors());
app.use((req, res, next) => {
  // "*" means that any site can connect to the app
  res.header("Access-Control-Allow-Origin", "*");
  // define which methods are provided by the API
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  app.use(cors());
  next();
});
app.use(express.static("public"));
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
//app.use(express.json());

// routes
app.use("/createUser", createUser);
app.use("/authUser", authUser);
app.use("/getUser", getUser);

//database
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB.");
  }
);

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);

app.listen(process.env.PORT || 7000, () =>
  console.log("Server is running in port " + (process.env.PORT || 7000))
);