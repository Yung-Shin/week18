const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// GET all users and POST a new user
router.route('/').get(getAllUsers).post(createUser);

// GET one user, PUT and DELETE a user by ID
router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUserById);

// POST and DELETE a friend to a user's friend list
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);


module.exports = router;