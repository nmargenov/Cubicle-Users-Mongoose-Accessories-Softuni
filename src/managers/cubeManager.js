const { default: mongoose } = require("mongoose");
const Cube = require("../models/Cube");

function getAllCubes(){
    return Cube.find();
}

async function createCube(name,description,imageUrl,difficultyLevel,creatorId){
    const cube = {
        name,
        description,
        imageUrl,
        difficultyLevel:Number(difficultyLevel),
        creatorId,
        accessories:[]
    }

    const newCube = await Cube.create(cube);

    return newCube;
}

function getCubeById(cubeId){
    if(!mongoose.Types.ObjectId.isValid(cubeId)){
        return false;
    }
    return Cube.findById(cubeId);
}

function getCubeByIdWithAccessories(cubeId){
    if(!mongoose.Types.ObjectId.isValid(cubeId)){
        return false;
    }
    return Cube.findById(cubeId).populate('accessories');
}

module.exports = {getAllCubes,createCube,getCubeById,getCubeByIdWithAccessories}