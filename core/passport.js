const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Users = require('../db/models/users');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    function(email, password, done) {
      return Users.where('email', email)
        .fetch({
          require: true,
          columns: ['id', 'email_verified', 'username', 'email', 'role', 'password'],
        })
        .then(model => {
          if (!model) return done(null, false, { message: 'User not found.' });
          if (!bcrypt.compareSync(password, model.get('password'))) {
            return done(null, false, { message: 'Wrong password.' });
          }
          model.unset('password');
          return done(null, model.toJSON(), { message: 'Logged In Successfully' });
        })
        .catch(err => done(err));
    }
  )
);
