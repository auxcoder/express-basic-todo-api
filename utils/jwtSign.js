const jwt = require('jsonwebtoken');

function jwtSign(user, sub, ttl) {
  return jwt.sign(
    {
      name: user.username,
      email: user.email,
      role: user.role,
      vrf: user.email_verified,
    },
    'secret',
    { algorithm: 'HS256', expiresIn: ttl, subject: sub }
  );
}

module.exports = jwtSign;
