const { createAccessory } = require('../managers/accessoryManager');
const { mustBeAuth } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get('/addAccessory',mustBeAuth,(req,res)=>{
    res.status(302).render('accessories/create');
});

router.post('/addAccessory',mustBeAuth,async(req,res)=>{
    const name = req.body.name.trim();
    const description = req.body.description.trim();
    const imageUrl = req.body.imageUrl.trim();

    if(name ==""
    ||description ==""
    ||imageUrl==""){
        throw new Error('Empty fields');
    }

    await createAccessory(name,description,imageUrl);

    res.redirect('/');
})

module.exports = router;