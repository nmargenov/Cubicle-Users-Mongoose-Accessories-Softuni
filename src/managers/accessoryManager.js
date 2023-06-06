const Accessory = require("../models/Accessory");

function createAccessory(name,description,imageUrl){
    const accessory = {
        name,
        description,
        imageUrl
    }
    const newAccessory = Accessory.create(accessory);
    return newAccessory;
}

module.exports = {createAccessory}