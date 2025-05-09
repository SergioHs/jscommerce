const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const upload = require('../middlewares/upload.middleware');

//GET localhost:3000/products/searchByname?searchTerm=....
router.get('/searchByName', productsController.searchByName);

//GET: localhost:3000/products
router.get('/', productsController.getAllProducts);

//GET: localhost:3000/products/1
router.get('/:id', productsController.getProduct);

//PATCH: localhost:3000/products/1
router.patch('/:id', productsController.updateProduct);

//POST: localhost:3000/products
router.post('/', upload.single('image'), productsController.createProduct);

//DELETE: localhost:3000/products
router.delete('/:id', productsController.removeProduct)

module.exports = router;