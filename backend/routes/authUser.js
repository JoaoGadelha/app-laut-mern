let express = require("express");
let authUser = express.Router();
let userSchema = require("../userSchema");

authUser.post("/", async (req, res) => {
  try {
    let userData;
    if (req.body.email !== "" && req.body.senha !== "") {
      userData = await userSchema.find({
        email: req.body.email,
      });
    } else {
      // campos de email ou senha estao vazios
      return res.json({ message: "-3" });
    }
    if (userData.length === 0) {
      //usuario nao existe
      return res.json({ message: "-1" });
    } else {
      if (userData[0].senha !== req.body.senha) {
        // senha errado
        return res.json({ message: "-2" });
      } else {
        return res.json({
          clientID: userData[0]._id,
          favorites: userData[0].favorites,
          message: "loggedin",
        });
      }
    }
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = authUser;