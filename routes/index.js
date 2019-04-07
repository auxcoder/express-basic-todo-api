const express = require('express');
const router = express.Router();
const todosRoute = require('./controllers/todos');
const usersRoute = require('./controllers/users');
const authRoute = require('./controllers/auth');

require('./misc')(router);
router.use('/todos', todosRoute);
router.use('/auth', authRoute);
router.use('/users', usersRoute);

module.exports = router;
