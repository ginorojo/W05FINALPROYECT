const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { 
        type: String, 
        required: true,
        enum: ['Pokeball', 'Potion', 'Berry', 'TM']
    },
    effect: { type: String, required: true },
    cost: { type: Number, min: 0 }
}, { versionKey: false });

module.exports = mongoose.model('Item', itemSchema);
