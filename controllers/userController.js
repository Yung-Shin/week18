const { User } = require('../models');

// variables that handle the user related methods 
const userController = {
  getAllUsers(req, res) {
    User.find({})
      .then(userData => res.json(userData))
      .catch(error => res.status(500).json(error));
  },

  getUserById(req, res) {
    User.findById(req.params.userId)
    .populate('thoughts')
    .populate('friends')
      .then(userData => res.json(userData))
      .catch(error => res.status(500).json(error));
  },
  
  createUser(req, res) {
    User.create(req.body)
      .then(userData => res.json(userData))
      .catch(error => res.status(500).json(error));
  },

  updateUserById(req, res) {
    User.findOneAndUpdate(req.params.id, req.body, { new: true })
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'Invalid User' });
        }
        res.json(userData);
      })
      .catch(error => res.status(500).json(error));
  },

  deleteUserById(req, res) {
    User.findOneAndDelete(req.params.id)
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'Invalid User' });
        }
        res.json({ message: 'Deleted Successfuly' });
      })
      .catch(error => res.status(500).json(error));
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body.friendId || req.params.friendId} },
      { new: true }
    )
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'Invalid User' });
        }
        res.json(userData);
      })
      .catch(error => res.status(500).json(error));
  },

  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "Invalid User ID" });
        }
        const removed = !dbUserData.friends.includes(params.friendId);
        if (removed) {
          res.json({ message: "Removed Successfuly", dbUserData });
        } else {
          res.json(dbUserData);
        }
      })
      .catch((error) => res.status(400).json(error));
  },
};


module.exports = userController;