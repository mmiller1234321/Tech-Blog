const router = require('express').Router();
const userRoutes = require('./newuserRoutes');

router.use('/users', userRoutes);
router.use('/comments', userRoutes);

module.exports = router;