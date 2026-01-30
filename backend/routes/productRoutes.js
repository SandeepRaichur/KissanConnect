const express = require('express');
const router = express.Router();
// IMPORT ALL FUNCTIONS HERE
const { 
  getProducts, 
  getProductById, 
  createProduct, 
  deleteProduct // <--- THIS WAS MISSING
} = require('../controllers/productController');

router.route('/').get(getProducts).post(createProduct);
router.route('/:id').get(getProductById).delete(deleteProduct);

module.exports = router;