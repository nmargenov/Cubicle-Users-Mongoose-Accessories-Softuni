const { getAllCubes } = require('../managers/cubeManager');

const router = require('express').Router();

router.get(['/','/index'],async(req,res)=>{
    const cubes = await getAllCubes().lean();

    res.status(302).render('index',{cubes});
});

router.get('/about',(req,res)=>{
    res.status(302).render('about');
});

module.exports = router;
