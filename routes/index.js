const Controller = require('../controllers/controller');

const router = require('express').Router();

router.get('/', Controller.landingPage);
router.get('/ruangcoding', Controller.loginPage);
router.post('/ruangcoding', Controller.validasiLogin);
router.get('/register', Controller.register);
router.post('/register', Controller.postRegister);

router.use(function(req, res, next){
    if(req.session.userId){
        next()
    } else {
        const error = 'please login first'
        // console.log(error);
        res.redirect(`/ruangcoding?=${error}`)
    }
})

router.get('/logout', Controller.getLogout);
router.get('/ruangcoding/home', Controller.displayCourses);
router.get('/ruangcoding/home/:idContent', Controller.getPageBuyContent);
router.get('/ruangcoding/home/:idContent/buy', Controller.buyContent);
router.get('/ruangcoding/home/mycourse', Controller.myCourse);
module.exports = router;
