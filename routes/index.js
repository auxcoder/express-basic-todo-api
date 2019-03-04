const express = require('express');
const router = express.Router();
const todosRoute = require('./todos');

require('./misc')(router);
router.use('/todos', todosRoute);

module.exports = router;
