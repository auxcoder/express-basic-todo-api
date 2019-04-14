const express = require('express');
const router = express.Router();
const constants = require('../../config/constants');
const Users = require('../../db/models/users');
const userValidations = require('../middlewares/validateUser');
const jwtSign = require('../../utils/jwtSign');
const hashPassword = require('../../utils/hashPass');
// READ all
router.get('/', (req, res) => {
  Users.fetchAll()
    .then(data => res.json({ errors: false, data: data }))
    .catch(err => res.status(500).json({ errors: [err.message], data: {} }));
});
// CREATE
router.post('/', userValidations.newUser, (req, res) => {
  hashPassword(req.body.password, constants.saltRounds)
    .then(data => {
      const dataMerged = Object.assign(
        {
          email: req.body.email,
          username: req.body.username,
          salt: data.salt,
          itr: data.itr,
          password: data.hash, // todo: should db field match "hash"
        },
        {
          verified: false,
          active: true,
          role: 1, // guess by default
          verification_token: jwtSign(
            Object.assign(req.body, { role: 1, email_verified: false }),
            'verification',
            constants.ttlVerify
          ),
        }
      );
      Users.forge(dataMerged)
        .save()
        .then(data => res.status(201).json({ errors: false, data: { id: data.id } }))
        .catch(err => res.status(500).json({ errors: [err.message], data: {} }));
    })
    .catch(err => {
      res.status(500).json({ errors: [err.message], data: {} });
    });
});
// READ
router.get('/:id([0-9]+)', (req, res) => {
  if (!req.params.id) console.error('quote ID is required');
  Users.where('id', req.params.id)
    .fetch({
      require: true,
      withRelated: ['tokens'],
    })
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
  let options = { require: true };
  // hard remove test record if env is dev
  if (process.env.NODE_ENV === 'test') options.hardDelete = true;
  Users.forge('id', req.params.id)
    .destroy(options)
    .then(() => res.json({ errors: false, message: 'User removed' }))
    .catch(err => res.status(500).json({ errors: [err.message], data: {} }));
});

module.exports = router;
