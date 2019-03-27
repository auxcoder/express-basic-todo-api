const express = require('express');
const router = express.Router();
const Users = require('../../db/models/users');
// READ
router.route('/').get((req, res) => {
  Users.fetchAll()
    .then(data => res.json({ errors: false, data: data }))
    .catch(err => res.status(500).json({ errors: [err.message], data: {} }));
});

// READ
router.get('/:id([0-9]+)', (req, res) => {
  if (!req.params.id) console.error('quote ID is required');
  Users.where('id', req.params.id)
    .fetch()
    .then(data => {
      if (!data) {
        res.status(404).json({ errors: true, data: {} });
      } else {
        res.json({ errors: false, data: data });
      }
    })
    .catch(err => res.status(500).json({ errors: [err.message], data: {} }));
});

module.exports = router;
