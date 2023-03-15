const express = require('express');
const { processPayment, sendStripeApiKey } = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middlewares/authentication');
const router = express.Router();

router.route('/payment/process').post(isAuthenticatedUser,processPayment);

router.route('/stripeapikey').get(isAuthenticatedUser,sendStripeApiKey);


module.exports = router;