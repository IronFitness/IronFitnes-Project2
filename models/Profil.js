const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profilSchema = new Schema({
    name: String,
    surname: String,
    size: Number,
    weight: Number,
    age: Number
})

const Profil = mongoose.model('Profil', profilSchema);
module.exports = Profil;
