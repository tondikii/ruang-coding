const {User, Promo, Course, Contents} = require('../models/index')

class Controller {
    static loginPage(req, res){
        res.render('login')
    }
    static register(req, res){
        res.render('register')
    }
    static postRegister(req, res){
        req.body.age = +req.body.age
        // console.log({data: req.body});
        User.create(req.body)
        .then(result => {
            // console.log(result.dataValues.id, '===');
            return Promo.create({code: req.body.phoneNumber.slice(2), UserId: result.dataValues.id});
        })
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            // res.send(err)
        })
    }
}
module.exports = Controller;