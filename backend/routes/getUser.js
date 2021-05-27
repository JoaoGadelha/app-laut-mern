let express = require("express");
let userData = express.Router();
let userSchema = require("../userSchema");

userData.get("/:id", async (req, res) => {
  try {
    const data = await userSchema.find({
      _id: req.params.id,
    });
    
    res.json(data[0]);

  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = userData;