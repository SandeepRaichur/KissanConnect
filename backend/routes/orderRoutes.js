const express = require('express');
const router = express.Router();
const { 
  addOrder, 
  getMyOrders, 
  getStats, 
  updateOrderStatus
} = require('../controllers/orderController');

router.post('/', addOrder);
router.get('/myorders', getMyOrders);
router.get('/stats', getStats);
router.put('/:id', updateOrderStatus); 

module.exports = router;