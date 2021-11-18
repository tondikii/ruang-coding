const Controller = require('../controllers/controller');

const router = require('express').Router();

router.get('/', Controller.landingPage)
router.get('/login', Controller.loginPage);
router.get('/register', Controller.register);
router.post('/user', Controller.homeUser);


module.exports = router;
