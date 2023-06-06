const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number,
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }],
    creatorId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;