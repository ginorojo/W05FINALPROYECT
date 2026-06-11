const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    region: { type: String },
    badgeCount: { type: Number, default: 0 },
    teamPokemonIds: [{ type: Number }]
}, { versionKey: false });

module.exports = mongoose.model('Trainer', trainerSchema);
