const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// send any api request with /api/users to the userRoutes
router.use('/users', userRoutes)
// send any api request with /api/thoughts to the thoughtRoutes
router.use('/thoughts', thoughtRoutes)


module.exports = router;