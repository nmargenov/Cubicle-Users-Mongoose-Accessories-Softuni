const router = require('express').Router();

router.get('/login',(req,res)=>{
    res.status(302).render('users/login');
});

router.post('/login',(req,res)=>{
    console.log(req.body.username);
    res.end();
});

module.exports = router;