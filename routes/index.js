const express = require('express');
const router = express.Router();
const todosRoute = require('./controllers/todos');

require('./misc')(router);
router.use('/todos', todosRoute);

module.exports = router;
