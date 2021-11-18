const {User, Promo, Course, Contents} = require('../models/index')

class Controller {
    static loginPage(req, res){
        res.render('login')
    }
    static register(req, res){
        res.render('register')
    }
}
module.exports = Controller;