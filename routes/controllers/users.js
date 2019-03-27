const express = require('express');
const router = express.Router();
const Users = require('../../db/models/users');
// READ
router.route('/').get((req, res) => {
  Users.fetchAll()
    .then(data => res.json({ errors: false, data: data }))
    .catch(err => res.status(500).json({ errors: [err.message], data: {} }));
});

module.exports = router;
