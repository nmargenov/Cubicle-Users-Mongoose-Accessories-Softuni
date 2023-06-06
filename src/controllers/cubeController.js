const { createCube, getCubeById, deleteCubeById, editCubeById, getCubeByIdWithAccessories } = require('../managers/cubeManager');
const { mustBeAuth } = require('../middlewares/authMiddleware');
const generateDifficultyLevelOptionsView = require('../utils/utils');

const router = require('express').Router();

router.get('/addCube',mustBeAuth,(req,res)=>{
    res.status(302).render("cubes/create");
});

router.post('/addCube',mustBeAuth,async(req,res)=>{
    const name = req.body.name.trim();
    const description = req.body.description.trim();
    const imageUrl = req.body.imageUrl.trim();
    const difficultyLevel = req.body.difficultyLevel;

    if(name == ""
    ||description == ""
    ||imageUrl == ""){
        throw new Error("Empty fields");
    }

    const creatorId = req.user._id;

    const cube = await createCube(name,description,imageUrl,difficultyLevel,creatorId);

    res.redirect(`/cubes/${cube._id}/details`);
});

router.get('/:cubeId/details',async(req,res)=>{
    const loggedUserId = req.user?._id;
    const cubeId = req.params.cubeId;
    const cube = await getCubeByIdWithAccessories(cubeId)
    ? await getCubeByIdWithAccessories(cubeId).lean()
    : false;

    if(!cube){
       return res.status(404).render('404');
    }

    const isCreator = loggedUserId == cube.creatorId;

    res.status(302).render('cubes/details',{cube,isCreator});
});

router.get('/:cubeId/delete',mustBeAuth,async (req,res)=>{
    const cubeId = req.params.cubeId;
    const loggedUserId = req.user._id;

    
    const cube = await getCubeById(cubeId)
    ? await getCubeById(cubeId).lean()
    : false;
    
    if(!cube){
        return res.status(404).render('404');
    }
    
    if(loggedUserId != cube.creatorId){
        return res.redirect('/');
    }

    const options = generateDifficultyLevelOptionsView(cube.difficultyLevel);


    res.status(302).render('cubes/delete',{cube,options})
});

router.post('/:cubeId/delete',mustBeAuth,async(req,res)=>{
    const cubeId = req.params.cubeId;
    const loggedUserId = req.user._id;

    
    const cube = await getCubeById(cubeId)
    ? await getCubeById(cubeId).lean()
    : false;
    
    if(!cube){
        return res.status(404).render('404');
    }
    
    if(loggedUserId != cube.creatorId){
        return res.redirect('/');
    }

    await deleteCubeById(cubeId);
    
    res.redirect('/');
});

router.get('/:cubeId/edit',mustBeAuth,async(req,res)=>{
    const cubeId = req.params.cubeId;
    const loggedUserId = req.user._id;

    const cube = await getCubeById(cubeId)
    ?await getCubeById(cubeId).lean()
    :false;

    if(!cube){
        return res.status(404).render('404');
    }
    
    if(loggedUserId != cube.creatorId){
        return res.redirect('/');
    }

    const options = generateDifficultyLevelOptionsView(cube.difficultyLevel);
    res.status(302).render('cubes/edit',{cube,options});
});

router.post('/:cubeId/edit',mustBeAuth,async(req,res)=>{
    const cubeId = req.params.cubeId;
    const loggedUserId = req.user._id;

    const name = req.body.name.trim();
    const description = req.body.description.trim();
    const imageUrl = req.body.imageUrl.trim();
    const difficultyLevel = req.body.difficultyLevel;

    if(name == ""
    ||description == ""
    ||imageUrl == ""){
        throw new Error("Empty fields");
    }


    const cube = await getCubeById(cubeId)
    ?await getCubeById(cubeId).lean()
    :false;

    if(!cube){
        return res.status(404).render('404');
    }
    
    if(loggedUserId != cube.creatorId){
        return res.redirect('/');
    }

    const editedCube = await editCubeById(cubeId,name,description,imageUrl,difficultyLevel);
    res.redirect(`/cubes/${editedCube._id}/details`);
});

module.exports = router;