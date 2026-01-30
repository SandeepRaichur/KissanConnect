const express = require('express');
const router = express.Router();
const { 
  addOrder, 
  getMyOrders, 
  getStats, 
  updateOrderStatus // <--- Make sure this is imported
} = require('../controllers/orderController');

router.post('/', addOrder);
router.get('/myorders', getMyOrders);
router.get('/stats', getStats);

// === THIS LINE IS CRITICAL ===
router.put('/:id', updateOrderStatus); 

module.exports = router;