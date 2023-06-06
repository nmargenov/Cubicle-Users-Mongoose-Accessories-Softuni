const { register, login } = require('../managers/userManager');
const { mustBeAuth, mustBeGuest } = require('../middlewares/authMiddleware');

const router = require('express').Router();


router.get('/login',mustBeGuest, (req,res)=>{
    res.status(302).render('users/login');
});

router.post('/login',mustBeGuest, async(req,res)=>{
    const username = req.body.username.trim();
    const password = req.body.password.trim();

    if(username == ""
    ||password == ""){
        throw new Error('Empty fields');
    }

    const token = await login(username,password);
    res.cookie('user',token,{httpOnly:true});
    res.redirect('/');
});

router.get('/register',mustBeGuest, (req,res)=>{
    res.status(302).render('users/register');
});

router.post('/register',mustBeGuest, async(req,res)=>{
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    const rePassword = req.body.repeatPassword.trim();

    if(username == ""
    ||password == ""
    ||rePassword == ""){
        throw new Error('Empty fields');
    }

    const token = await register(username,password,rePassword);
    res.cookie('user',token,{httpOnly:true});
    res.redirect('/');
});

router.get('/logout',mustBeAuth,(req,res)=>{
    res.clearCookie('user');
    res.redirect('/');
});

module.exports = router;