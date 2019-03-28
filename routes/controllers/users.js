const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../../db/models/users');
const userValidations = require('../middlewares/validateUser');

// READ
router.route('/').get((req, res) => {
  Users.fetchAll()
    .then(data => res.json({ errors: false, data: data }))
    .catch(err => res.status(500).json({ errors: [err.message], data: {} }));
});
// CREATE
router.post('/', userValidations.newUser, (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  Users.forge({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
    // -----------------------------------------------
    email_verified: false,
    salt: salt,
    verification_token: jwt.sign(
      {
        algorithm: 'HS256',
        expiresIn: 60 * 60 * 24 * 7 * 2,
        subject: 'verification',
        payload: {
          role: null, // todo: define role
          name: req.body.username,
          email: req.body.email,
        },
      },
      'secret'
    ),
  })
    .save()
    .then(data => res.status(201).json({ errors: false, data: { id: data.id } }))
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
// UPDATE
router.patch('/:id([0-9]+)', userValidations.patchUser, (req, res) => {
  if (!req.params.id) console.error('user ID is required');
  Users.where('id', req.params.id)
    .fetch()
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

module.exports = router;
