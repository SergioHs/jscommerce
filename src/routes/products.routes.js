const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const upload = require('../middlewares/upload.middleware');

//GET localhost:3000/products/searchByname?searchTerm=....
router.get('/searchByName', productsController.searchByName);

//GET: localhost:3000/products
router.get('/', productsController.getAllProducts);

//PATCH: localhost:3000/products/1/stock
router.patch('/:id/stock', productsController.updateStock);

//GET: localhost:3000/products/1
router.get('/:id', productsController.getProduct);

//PUT: localhost:3000/products/1
router.put('/:id', upload.single('image'), productsController.updateProduct);

//POST: localhost:3000/products
router.post('/', upload.single('image'), productsController.createProduct);

//DELETE: localhost:3000/products
router.delete('/:id', productsController.removeProduct);


module.exports = router;