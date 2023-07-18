const { Thought, User, Reaction } = require('../models');
const {Types} = require('mongoose');

// variable that handles the thought related methods
const thoughtController = {async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getThoughtsById(req, res) {
    try {
      const thought = await Thought.findOne({_id:req.params.thoughtId});
      if (!thought) {
        res.status(404).json({ message: 'Invalid' });
      } else {
        res.json(thought);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.status(201).json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  
  async deleteThought(req,res) {
    try {
        const thought = await Thought.findByIdAndDelete({_id:req.params.thoughtId});
        if (!thought) {
          return res.status(404).json({ message: 'Invalid' });
        }
        res.status(200).json({ message: 'Successfuly Deleted' });
    } catch (error) {
        res.status(500).json(error);
    }
  },

  async updateThoughtById(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
        new: true,
      });
      if (!thought) {
        res.status(404).json({ message: 'Invalid' });
      } else {
        res.json(thought);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async createReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
            {_id:req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        );
        thought ? res.json(thought) : res.status(404).json({message: invalid});
    } catch (e) {
        res.status(500).json(e);
    }
  },

  async deleteReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        );
        thought ? res.json(thought) : res.status(404).json({message: invalid});
    } catch (e) {
        res.status(500).json(e);
    }
  },
};


module.exports = thoughtController;