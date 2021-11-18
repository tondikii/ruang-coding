const {User, Promo, Course, Content} = require('../models/index')
const bcrypt = require('bcryptjs'); 
const {Op} = require("sequelize");
const currency = require('../helpers/currency');

const nodemailer = require('nodemailer')

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
            console.log(user);
            const error = 'invalid username/password'
            if(user) {
                // console.log(user.dataValues.password);
                const isValidPassword = bcrypt.compareSync(password, user.dataValues.password);
                if(isValidPassword) {
                    req.session.userId = user.dataValues.id

                    res.redirect('/ruangcoding/home')}
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
            Controller.sendEmail(result.dataValues.email);
            return Promo.create({code: req.body.phoneNumber.slice(2), UserId: result.dataValues.id});
        })
        .then( () =>{
            res.redirect('/ruangcoding')
        //     // console.log({dataEmail: data});
        //     // let msg = 'Register is done, Welcome to RuangCoding'
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
        let buy = req.query.buy
        // console.log({search});
        // console.log({html, css, javascript});
        // if (typeof buy == "string"){
        //     res.render('home', {dat})
        // }
         if (search) {
            Content.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${search}%`
                    }
                }
            })
            .then(result => {
            console.log(result);
            let data = result.map(el => el.dataValues)
            console.log({data});

            res.render('home', {data: result, currency});
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
            res.render('home', {data: result, currency});
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
                res.render('home', {data: result, currency});
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
                res.render('home', {data: result, currency});
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
                res.render('home', {data: result, currency});
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            });
        }
    }
    static sendEmail (email){
        console.log('masuk');
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ruangcodinghcktv8@gmail.com',
                pass: 'hacktiv8'
            }
        })
        let mailOptions = {
            from: 'ruangcodinghcktv8@gmail.com',
            to: `${email}`,
            subject: 'Welcome Greetings',
            text: 'Welcome to RuangCoding, Have a good study!'
        }
        transporter.sendMail(mailOptions, (err, data) =>{
            if(err){
                console.log(err);
            } else {
                console.log('E-mail has been sent');
            }
        })
    }

    static getPageBuyContent(req, res){
        const idContent = +req.params.idContent;
        // console.log(id);
        Content.findOne({where: {id: idContent}})
        .then(result => {
            res.render('buyContent.ejs', {data: result, currency});
        })
    }
    
    static buyContent(req, res){
        const idContent = +req.params.idContent;
        const idUser = req.session.userId;
        console.log(idUser);
        console.log(idContent);
        Content.update(
            {UserId: id},
            {where: {id: idContent}
        })
        .then(result => {
            console.log(result);
            res.redirect('/');
        })
        .catch(error => {
            
        })
    }

    static myCourse(req, res){
        
    }

    static getLogout(req, res){
        req.session.destroy((err) => {
            if (err) res.send(err)
            else res.redirect('/ruangcoding');
        })
    }
}
module.exports = Controller;