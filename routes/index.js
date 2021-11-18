const Controller = require('../controllers/controller');

const router = require('express').Router();

router.get('/', Controller.landingPage);
router.get('/ruangcoding', Controller.loginPage);
router.post('/ruangcoding', Controller.validasiLogin);
router.get('/register', Controller.register);
router.post('/register', Controller.postRegister);
router.get('/ruangcoding/home', Controller.displayCourses);
module.exports = router;
