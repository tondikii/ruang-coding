const Controller = require('../controllers/controller');

const router = require('express').Router();

router.get('/', Controller.loginPage);
router.get('/register', Controller.register);

module.exports = router;