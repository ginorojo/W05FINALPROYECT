const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    type1: { type: String, required: true },
    type2: { type: String },
    hp: { type: Number, required: true },
    attack: { type: Number, required: true },
    defense: { type: Number }
}, { versionKey: false });

module.exports = mongoose.model('Pokemon', pokemonSchema);
