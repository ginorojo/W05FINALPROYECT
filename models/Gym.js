const mongoose = require('mongoose');

const gymSchema = new mongoose.Schema({
    name: { type: String, required: true },
    leaderName: { type: String, required: true },
    badgeName: { type: String, required: true },
    region: { type: String, required: true }
}, { versionKey: false });

module.exports = mongoose.model('Gym', gymSchema);
