const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');

//GET: localhost:3000/products
router.get('/', productsController.getAllProducts);

//GET: localhost:3000/products/1
router.get('/:id', productsController.getProduct);

//PATCH: localhost:3000/products/1
router.patch('/:id', productsController.updateProduct);


module.exports = router;