const { register, login } = require('../managers/userManager');

const router = require('express').Router();

router.get('/login',(req,res)=>{
    res.status(302).render('users/login');
});

router.post('/login',async(req,res)=>{
    const username = req.body.username.trim();
    const password = req.body.password.trim();

    if(username == ""
    ||password == ""){
        throw new Error('Empty fields');
    }

    const user = await login(username,password);
    console.log(user);
    res.redirect('/');
});

router.get('/register',(req,res)=>{
    res.status(302).render('users/register');
});

router.post('/register',async(req,res)=>{
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    const rePassword = req.body.repeatPassword.trim();

    if(username == ""
    ||password == ""
    ||rePassword == ""){
        throw new Error('Empty fields');
    }

    const user = await register(username,password,rePassword);
    console.log(user);
    res.redirect('/');
});

module.exports = router;