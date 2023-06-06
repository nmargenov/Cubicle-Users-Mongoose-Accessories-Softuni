const { getAllCubes } = require('../managers/cubeManager');

const router = require('express').Router();

router.get(['/','/index'],async(req,res)=>{
    const {search,from,to} = req.query;

    
    let cubes = await getAllCubes().lean();
    
    if(search){
        cubes = cubes.filter(cube=>cube.name.toLowerCase().includes(search.trim().toLowerCase()));
    }

    if(from){
        cubes = cubes.filter(cube=>cube.difficultyLevel>=Number(from));
    }

    if(to){
        cubes = cubes.filter(cube=>cube.difficultyLevel<=Number(to));
    }

    res.status(302).render('index',{cubes,search,from,to});
});

router.get('/about',(req,res)=>{
    res.status(302).render('about');
});

module.exports = router;
