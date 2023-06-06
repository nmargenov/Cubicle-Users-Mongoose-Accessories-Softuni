const router = require('express').Router();

const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const cubeController = require('./controllers/cubeController');
const accesosryController = require('./controllers/accessoryController');

router.use(homeController);
router.use('/users',userController);
router.use('/cubes',cubeController);
router.use('/accessories',accesosryController);


router.get('*',(req,res)=>{
    res.status(404);
    res.render('404');
});

module.exports = router;