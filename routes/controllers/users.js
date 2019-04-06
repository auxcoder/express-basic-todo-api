const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../../db/models/users');
const userValidations = require('../middlewares/validateUser');
const jwtSign = require('../../utils/jwtSign');
// READ
router.route('/').get((req, res) => {
  Users.fetchAll()
    .then(data => res.json({ errors: false, data: data }))
    .catch(err => res.status(500).json({ errors: [err.message], data: {} }));
});
// CREATE
router.post('/', userValidations.newUser, (req, res) => {
  // sec * min * day * week * 2
  const _ttl = 60 * 60 * 24 * 7 * 2; // two weeks live
  const salt = bcrypt.genSaltSync(10);
  Users.forge({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
    // -----------------------------------------------
    email_verified: false,
    salt: salt,
    active: true,
    role: 0, // guess by default
    verification_token: jwtSign(Object.assign(req.body, { role: 1, email_verified: false }), 'verification', _ttl),
  })
    .save()
    .then(data => res.status(201).json({ errors: false, data: { id: data.id } }))
    .catch(err => res.status(500).json({ errors: [err.message], data: {} }));
});
// READ
router.get('/:id([0-9]+)', (req, res) => {
  if (!req.params.id) console.error('quote ID is required');
  Users.where('id', req.params.id)
    .fetch({ require: false })
    .then(data => {
      if (!data) {
        res.status(404).json({ errors: true, message: 'User not found' });
      } else {
        res.json({ errors: false, data: data });
      }
    })
    .catch(err => res.status(500).json({ errors: [err.message], data: {} }));
});
// UPDATE
router.patch('/:id([0-9]+)', userValidations.patchUser, (req, res) => {
  if (!req.params.id) console.error('user ID is required');
  Users.where('id', req.params.id)
    .fetch({ require: true })
    .then(user => {
      user
        .save({
          username: req.body.username,
          email: req.body.email,
          // -----------------------------------------------
          updated_at: new Date().toISOString(),
        })
        .then(data => {
          return res.json({
            errors: false,
            data: data,
            message: 'User updated',
          });
        });
    })
    .catch(err => res.status(500).json({ errors: [err.message], data: {} }));
});
// DELETE
router.delete('/:id([0-9]+)', (req, res) => {
  if (!req.params.id) console.error('user ID is required');
  Users.forge('id', req.params.id)
    .destroy({ require: true })
    .then(() => res.json({ errors: false, message: 'User removed' }))
    .catch(err => res.status(500).json({ errors: [err.message], data: {} }));
});

module.exports = router;
