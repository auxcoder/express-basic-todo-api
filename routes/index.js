const express = require('express');
const router = express.Router();
const passport = require('passport');
const todosRoute = require('./controllers/todos');
const usersRoute = require('./controllers/users');
const authRoute = require('./controllers/auth');
// routes
require('./misc')(router);
router.use('/auth', authRoute);
// router.use('/todos', passport.authenticate('jwt', { session: false }), todosRoute);
router.use('/todos', todosRoute);
router.use('/users', passport.authenticate('jwt', { session: false }), usersRoute);
// module
module.exports = router;
