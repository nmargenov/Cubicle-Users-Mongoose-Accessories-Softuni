const Cube = require("../models/Cube");

async function createCube(name,description,imageUrl,difficultyLevel,creatorId){
    const cube = {
        name,
        description,
        imageUrl,
        difficultyLevel,
        creatorId,
        accessories:[]
    }

    const newCube = await Cube.create(cube);

    return newCube;
}

module.exports = {createCube}