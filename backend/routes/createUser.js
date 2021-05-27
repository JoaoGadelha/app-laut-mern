let express = require('express');
let createUser = express.Router();
let userSchema = require('../userSchema');



createUser.post('/', async (req, res) => {
    
     let usr = new userSchema({
        email: req.body.email,
        senha: req.body.senha,
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        curso: req.body.curso
    });

     try {
        newUsrInfo = await usr.save();
        res.json(newUsrInfo);
    } catch (err) {
        res.json({ message: err });
    } 
})

module.exports = createUser;