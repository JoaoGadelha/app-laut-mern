const mongoose = require('mongoose');
 
 const userSchema = new mongoose.Schema({
   email: String,
   senha: String,
   nome: String,
   sobrenome: String,
   curso: String
}, { collection: 'app-laut' });

module.exports = mongoose.model('app-laut', userSchema);