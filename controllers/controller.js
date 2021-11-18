const {User, Promo, Course, Contents} = require('../models/index')

class Controller {
    static landingPage(req, res){
        res.render('landingPage')
    }
    static loginPage(req, res){
        res.render('login')
    }
    static register(req, res){
        res.render('register')
    }
    static homeUser(req, res){
        res.redirect('homeUser')
    }
}
module.exports = Controller;