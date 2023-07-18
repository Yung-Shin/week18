const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtsById,
    createThought,
    deleteThought,
    updateThoughtById,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// GET all thoughts and POST a new thought
router.route('/').get(getAllThoughts).post(createThought);

// GET one thought, PUT and DELETE a thought by id
router.route('/:thoughtId').get(getThoughtsById).put(updateThoughtById).delete(deleteThought);

// Post a reaction to a thought
router.route('/:thoughtId/reactions').post(createReaction);

// Delete a reaction from a thought
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);


module.exports = router;