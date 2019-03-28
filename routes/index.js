const express = require('express');
const router = express.Router();
const todosRoute = require('./controllers/todos');
const usersRoute = require('./controllers/users');

require('./misc')(router);
router.use('/todos', todosRoute);
router.use('/users', usersRoute);

module.exports = router;
