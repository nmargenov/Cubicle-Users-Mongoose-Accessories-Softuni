const mongoose = require('mongoose');

const accessoryScheme = new mongoose.Schema({
    name:String,
    description:String,
    imageUrl:String
});

const Accessory = mongoose.model('Accessory',accessoryScheme);

module.exports = Accessory;