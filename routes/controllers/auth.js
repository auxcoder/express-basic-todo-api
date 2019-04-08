const express = require('express');
const router = express.Router();
const passport = require('passport');
const Users = require('../../db/models/users');
const userValidations = require('../middlewares/validateUser');
const jwtSign = require('../../utils/jwtSign');
const buildUserAttrs = require('../../utils/buildUserAtts');
const hashPassword = require('../../utils/hashPass');
// READ exist
router.get('/exist/:email', userValidations.existUser, (req, res) => {
  Users.findByEmail(req.params.email, {
    require: true,
    columns: ['email', 'email_verified'],
  })
    .then(data => {
      res.json({ errors: false, data: data });
    })
    .catch(err => {
      res.status(404).json({ errors: [err.message], data: {} });
    });
});
// REGISTER
router.post('/register', userValidations.newUser, async (req, res) => {
  Users.findByEmail(req.body.email, {
    columns: ['id', 'email', 'email_verified'],
  })
    .then(model => {
      if (!model) {
        return hashPassword(req.body.password, 10);
      }
      // response with errors, user exist &|| not verified
      const messages = [`Email in use: ${model.get('email')}`];
      if (!model.get('email_verified')) messages.push(`Email not veryfied: ${model.get('email_verified')}`);
      res.status(400).json({ errors: messages, data: {} });
    })
    .then(data => {
      return Users.forge(buildUserAttrs(req.body, data)).save();
    })
    .then(model => {
      res.status(201).json({ errors: false, data: { id: model.id } });
    })
    .catch(err => {
      res.json({ errors: [err.message], data: { id: model.id } });
    });
});
// LOGIN
router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) console.log(err);
    if (!user) {
      res.status(404).json({ error: ['User not found'], data: {} });
    }
    const _ttl = req.body.ttl || 60 * 60 * 24 * 7 * 2;
    req.login(user, { session: false }, err => {
      if (err) res.send(err);
      const token = jwtSign(user, 'auth', _ttl);
      Tokens.forge({ id: token, user_id: user.id })
        .save(null, { method: 'insert' })
        .then(model => {
          res.status(201).json({ errors: false, data: model });
        })
        .catch(err => {
          res.status(500).json({ errors: [err.message], data: {} });
        });
    });
  })(req, res);
});
// module
module.exports = router;
