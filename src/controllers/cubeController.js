const { mustBeAuth } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get('/addCube',mustBeAuth,(req,res)=>{
    res.status(302).render("cubes/create");
});

router.post('/addCube',mustBeAuth,(req,res)=>{
    console.log(req.body);
    res.end();
});


module.exports = router;