const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, createProductReview, getAllReviews, deleteReview,getProductDetails, getAdminProducts } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRole } = require('../middlewares/authentication');
const router = express.Router();




router.route('/products').get(getAllProducts);

router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRole("admin"),createProduct);

router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRole("admin"),updateProduct).delete(isAuthenticatedUser,authorizeRole("admin"),deleteProduct);

router.route('/product/:id').get(getProductDetails);

router.route('/admin/products').get(isAuthenticatedUser,authorizeRole("admin"),getAdminProducts)

router.route('/review').put(isAuthenticatedUser,createProductReview);

router.route('/reviews').get(getAllReviews).delete(isAuthenticatedUser,deleteReview);


module.exports = router;