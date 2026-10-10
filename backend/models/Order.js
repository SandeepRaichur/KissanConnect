const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    buyer: { type: String, required: true },
    farmer: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    paymentMethod: { type: String, required: true }, 
    isPaid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);