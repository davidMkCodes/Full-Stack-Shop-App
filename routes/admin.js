const path = require('path');
const express = require('express');
const { body } = require('express-validator');
const isAuth = require('../middleware/is-auth');
const Router = express.Router();

const adminController = require('../controllers/admin');

Router.get('/add-product', isAuth, adminController.getAddProduct);
Router.get('/products', isAuth, adminController.getProducts);

Router.post(
    '/add-product',
    [
        body('title')
            .isString()
            .isLength({min: 3})
            .trim(),
        body('price')
            .isFloat(),
        body('description')
            .isLength({min: 5, max: 400})
            .trim()
    ],
    isAuth,
    adminController.postAddProduct
);

Router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

Router.post('/edit-product',
    [
        body('title')
            .isString()
            .isLength({min: 3})
            .trim(),
        body('imageURL')
            .isURL(),
        body('price')
            .isFloat(),
        body('description')
            .isLength({min: 5, max: 400})
            .trim()
    ],
    isAuth,
    adminController.postEditProduct);

Router.delete('/product/:productId', isAuth, adminController.deleteProduct);

module.exports = Router;