const path = require('path');
const express = require('express');
const Router = express.Router();
const isAuth = require('../middleware/is-auth');
const shopController = require('../controllers/shop')

Router.get('/',shopController.getIndex);
Router.get('/products', shopController.getProducts);
Router.get('/products/:productId', shopController.getProduct);
Router.get('/cart', isAuth, shopController.getCart);
Router.post('/cart', isAuth, shopController.postCart);
Router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);
Router.get('/checkout', isAuth, shopController.getCheckout);
Router.get('/checkout/success', shopController.getCheckoutSuccess);
Router.get('/checkout/cancel', shopController.getCheckout);
Router.get('/orders', isAuth, shopController.getOrders);
Router.get('/orders/:orderId', isAuth, shopController.getInvoice);
module.exports = Router;