const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');


exports.loginPage = (req, res, next) => {
    res.render('/users/login');
};

exports.registerPage = (req, res, next) => {
    res.render('/users/register');
};

exports.loginPostForm = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/ideas',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
};

exports.registerUser = (req, res) => {
    let errors = [];

    if(req.body.password !== req.body.password2) {
        errors.push({text: 'Passwords do not match'});
    }

    if(req.body.password.length < 4) {
        errors.push({
            text: 'Password mut be at least 4 characters'
        });
    }

    if(errors.length > 0) {
        res.render('users/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        });
    } else {
        User.findOne({email: req.body.email})
            .then(user => {
                if(user) {
                    req.flash('error_msg', 'Email already registered');
                    res.redirect('/user/register');
                } else {
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can log in');
                                    res.redirect('/users/login');
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        })
                    })
                }
            })
    }

};

exports.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
};