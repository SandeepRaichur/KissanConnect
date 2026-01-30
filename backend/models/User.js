const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true, // No two users can have the same email
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    role: {
      type: String,
      enum: ['farmer', 'buyer', 'admin'], // <--- Added 'admin' here
      default: 'farmer',
    },
  },
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' times
  }
);

module.exports = mongoose.model('User', userSchema);