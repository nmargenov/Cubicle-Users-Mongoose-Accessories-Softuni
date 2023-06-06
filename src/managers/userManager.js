const bcrypt = require('bcrypt');

const User = require("../models/User");
const { SECRET } = require('../config/config');
const { sign } = require('../lib/jwt');

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

    const payload = {
        _id:createdUser._id,
        username:createdUser.username
    }

    const token = sign(payload,SECRET,{ expiresIn: '2d'});

    return token;
}

async function login(username,password){
    const user = await User.findOne({username});

    if(!user){
        throw new Error("Username or password don't match!");
    }

    const isValidPassword = await bcrypt.compare(password,user?.password);

    if(!isValidPassword){
        throw new Error("Username or password don't match!");
    }

    const payload = {
        _id:user._id,
        username:user.username
    }

    const token = sign(payload,SECRET,{ expiresIn: '2d'});

    return token;
}

module.exports = {
    register,
    login
}