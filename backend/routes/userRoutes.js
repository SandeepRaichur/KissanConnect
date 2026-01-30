const express = require('express');
const router = express.Router();
// IMPORT ALL FUNCTIONS HERE
const { 
  registerUser, 
  loginUser, 
  updateUserProfile, // <--- WAS MISSING
  getAllUsers,       // <--- WAS MISSING
  deleteUser         // <--- WAS MISSING
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', updateUserProfile);
router.get('/', getAllUsers);
router.delete('/:id', deleteUser);

module.exports = router;