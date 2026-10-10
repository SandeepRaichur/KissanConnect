const Order = require('../models/Order');
const User = require('../models/User');

// @desc    Create new order
const addOrder = async (req, res) => {
  const { product, quantity, price, buyer, farmer, paymentMethod } = req.body;
  try {
    const order = await Order.create({
      product,
      quantity,
      price,
      buyer,
      farmer,
      paymentMethod,
      isPaid: paymentMethod !== 'COD'
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: 'Order Failed' });
  }
};

// @desc    Get orders for a specific farmer
const getMyOrders = async (req, res) => {
  const farmerName = req.query.farmer;
  try {
    const orders = await Order.find({ farmer: farmerName }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get System Stats
const getStats = async (req, res) => {
  try {
    const farmerCount = await User.countDocuments({ role: 'farmer' });
    const buyerCount = await User.countDocuments({ role: 'buyer' });
    const orderCount = await Order.countDocuments({});
    const orders = await Order.find({});
    const totalVolume = orders.reduce((acc, item) => acc + (Number(item.price) || 0), 0);

    res.json({ farmerCount, buyerCount, orderCount, totalVolume });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
};

// @desc    Update Order Status
// @route   PUT /api/orders/:id
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = req.body.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Export ALL functions
module.exports = { addOrder, getMyOrders, getStats, updateOrderStatus };