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

function getAllAccessories(){
    return Accessory.find();
}

function getRemainingAccessories(accessories){
    return Accessory.find({ _id: {$nin: accessories }});
}

module.exports = {createAccessory,getAllAccessories,getRemainingAccessories}