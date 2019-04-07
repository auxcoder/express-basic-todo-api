const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwtSign = require('../../utils/jwtSign');
// LOGIN
router.post('/login', (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) console.log(err);
    if (!user) {
      return res.status(404).json({ error: true, message: info ? info.message : 'Login failed' });
    }
    req.login(user, { session: false }, err => {
      if (err) res.send(err);
      const _ttl = 60 * 60 * 24 * 7 * 2;
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
