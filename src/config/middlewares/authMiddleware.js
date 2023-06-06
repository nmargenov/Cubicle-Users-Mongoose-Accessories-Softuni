const { verify } = require("../../lib/jwt");
const { SECRET } = require("../config");

exports.auth = async (req,res,next)=>{
    const token = req.cookies['user'];

    if(token){
        try{
            const decodedToken = await verify(token,SECRET);

            req.user = decodedToken;
            res.locals.isLogged = true;

            next();
        }catch(err){
            res.clearCookie('user');

            res.redirect('/users/login');
        }
    }else{
        next();
    }
};

exports.mustBeAuth = (req,res,next)=>{
    if(!req.user){
        return res.redirect('/users/login');
    }
    next();
};

exports.mustBeGuest = (req,res,next)=>{
    if(req.user){
        return res.redirect('/');
    }
    next();
};