const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  updateUserProfile,
  getAllUsers,
  deleteUser
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', updateUserProfile);
router.get('/', getAllUsers);
router.delete('/:id', deleteUser);

module.exports = router;