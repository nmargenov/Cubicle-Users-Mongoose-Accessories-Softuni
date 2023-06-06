const router = require('express').Router();

router.get(['/','/index'],(req,res)=>{
    res.status(302).render('index');
});

router.get('/about',(req,res)=>{
    res.status(302).render('about');
});

module.exports = router;
