const express = require('express');
const { check, body } = require('express-validator');


const authController = require('../controllers/auth');
const User = require('../models/user');
const Router = express.Router();

Router.get('/login', authController.getLogin);
Router.get('/signup', authController.getSignup);

Router.post(
    '/login',
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email address.')
            .normalizeEmail(),
        body(
            'password',
            'Invalid password.'
        )
            .isLength({min:5})
            .isAlphanumeric()
            .trim()
    ],
    authController.postLogin
);

Router.post(
    '/signup',
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, { req }) => {
                return User.findOne({ email: value }).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject(
                            'E-Mail exists already, please pick a different one.'
                        );
                    }
                });
            })
            .normalizeEmail(),
        body(
            'password',
            'Please enter a password with only numbers and text and at least 5 characters.'
        )
            .isLength({ min: 5 })
            .isAlphanumeric()
            .trim(),
        body('confirmPassword')
            .trim()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords have to match!');
                }
                return true;
            })
    ],
    authController.postSignup
);

Router.post('/logout', authController.postLogout);
Router.get('/reset', authController.getReset);
Router.post('/reset', authController.postReset);
Router.get('/reset/:token', authController.getNewPassword);
Router.post('/reset/:token', authController.postNewPassword);


module.exports = Router;