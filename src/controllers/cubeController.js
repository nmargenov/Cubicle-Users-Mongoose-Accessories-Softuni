const { createCube } = require('../managers/cubeManager');
const { mustBeAuth } = require('../middlewares/authMiddleware');

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
    const cube = null;

    res.status(302).render('cubes/details',cube);
});


module.exports = router;