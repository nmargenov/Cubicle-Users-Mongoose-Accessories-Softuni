const bcrypt = require('bcrypt');

const User = require("../models/User");

async function register(username,password,rePassword){
    const existingUsername = await User.findOne({username});

    if(existingUsername){
        throw new Error("Existing username!");
    }

    if(password != rePassword){
        throw new Error("Passwords don't match!");
    }

    const hashPass = await bcrypt.hash(password,10);

    const user = {
        username,
        password:hashPass
    }

    const createdUser = await User.create(user);

    return createdUser;
}

module.exports = {
    register
}