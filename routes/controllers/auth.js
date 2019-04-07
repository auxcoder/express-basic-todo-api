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
  try {
    Users.findByEmail(req.body.email, {
      columns: ['id', 'email', 'email_verified'],
    }).then(model => {
      // response with errors, user exist &|| not verified
      const messages = [`Email in use: ${model.get('email')}`];
      if (!model.get('email_verified')) messages.push(`Email not veryfied: ${model.get('email_verified')}`);
      res.status(400).json({ errors: messages, data: {} });
    });

    // create new user
    const data = await hashPassword(req.body.password, 10);
    const dataMerged = buildUserAttrs(req.body, data);
    const newUser = await Users.forge(dataMerged).save();
    res.status(201).json({ errors: false, data: { id: newUser.id } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [err.message], data: {} });
  }
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
      return res.json({
        errors: false,
        data: {
          id: jwtSign(user, 'auth', _ttl),
          user_id: user.id,
        },
      });
    });
  })(req, res);
});
// module
module.exports = router;
