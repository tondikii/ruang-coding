const {User, Promo, Course, Content} = require('../models/index')
const bcrypt = require('bcryptjs'); 
const {Op} = require("sequelize");
const currency = require('../helpers/currency');

class Controller {
    static landingPage(req, res){
        Course.findAll()
        .then(result => {
            let data = result.map(el => el.dataValues);
            console.log(data);
            res.render('landingPage', {data});
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
    }

    static loginPage(req, res){
        res.render('login')
    }
    static validasiLogin(req, res){
        const {username, password} = req.body;
        // console.log({username, password});
        User.findOne({ where: {username} })
        .then(user => {
            const error = 'invalid username/password'
            if(user) {
                // console.log(user.dataValues.password);
                const isValidPassword = bcrypt.compareSync(password, user.dataValues.password);
                if(isValidPassword) res.redirect('/ruangcoding/home')
                else res.redirect(`/ruangcoding?error=${error}`)
            }
            else res.redirect(`/ruangcoding?error=${error}`)
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
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
            res.redirect('/ruangcoding');
        })
        .catch(err => {
            console.log(err.message);
            res.send(err.message)
        })
    }

    static displayCourses(req, res){
        let html = req.query.html;
        let css = req.query.css;
        let javascript = req.query.javascript;
        let search = req.query.search;
        // console.log({search});
        // console.log({html, css, javascript});
        if (search) {
            Content.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${search}%`
                    }
                }
            })
            .then(result => {
            // console.log(result);
            let data = result.map(el => el.dataValues)
            console.log({data});
            res.render('home', {data, currency});
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            })
        } else if (typeof html == "string") {
            Content.findAll({
                where: {
                    CourseId: 1
                }
            })
            .then(result => {
            let data = result.map(el => el.dataValues)
            res.render('home', {data, currency} );
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            })
        } else if (typeof css == "string") {
            Content.findAll({
                where: {
                    CourseId: 2
                }
            })
            .then(result => {
                let data = result.map(el => el.dataValues)
                res.render('home', {data, currency} );
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            });
        } else if (typeof javascript == "string") {
            Content.findAll({
                where: {
                    CourseId: 3
                }
            })
            .then(result => {
                let data = result.map(el => el.dataValues)
                res.render('home', {data, currency} );
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            });
        } else {
            Content.findAll()
            .then(result => {
                console.log(result);
                let data = result.map(el => el.dataValues)
                res.render('home', {data, currency} );
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            });
        }
    }
}
module.exports = Controller;