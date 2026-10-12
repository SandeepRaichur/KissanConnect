const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri || uri.trim() === '') {
    console.error('❌ [MongoDB Configuration Error]: MONGO_URI environment variable is missing.');
    console.error('❌ Please define MONGO_URI in your environment settings (e.g. Render Dashboard -> Environment Variables).');
    return null;
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    return null;
  }
};

module.exports = connectDB;