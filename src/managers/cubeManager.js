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

module.exports = {getAllCubes,createCube}