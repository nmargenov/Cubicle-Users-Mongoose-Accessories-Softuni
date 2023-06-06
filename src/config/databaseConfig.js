const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/Cubicle-3'

async function connectToDb(){
    await mongoose.connect(uri);
}

module.exports = connectToDb;