const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const products = [
  { name: "Sharbati Wheat", price: 2800, farmer: "Ramesh Farms", location: "Punjab", category: "Grains", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400", rating: 4.8 },
  { name: "Organic Tomatoes", price: 25, farmer: "Suresh Patil", location: "Nashik", category: "Vegetables", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400", rating: 4.5 },
  { name: "Basmati Rice", price: 6500, farmer: "Green Fields", location: "Haryana", category: "Grains", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400", rating: 4.9 },
  { name: "Red Onions", price: 30, farmer: "Kissan Co-op", location: "Indore", category: "Vegetables", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=400", rating: 4.3 }
];

const importData = async () => {
  try {
    await Product.deleteMany(); // Clear old data
    await Product.insertMany(products);
    console.log('DATA IMPORTED SUCCESS!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();