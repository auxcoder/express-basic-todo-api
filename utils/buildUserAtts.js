const jwtSign = require('../utils/jwtSign');
const buildUserAttrs = (user, data) => {
  const emailVerified = false;
  const role = 1; // guess by default
  const ttl = 60 * 60 * 24 * 7 * 2; // two weeks (sec * min * day * week * 2)
  const userData = Object.assign(user, { role: role, email_verified: emailVerified });
  return Object.assign(
    {
      email: user.email,
      username: user.username,
      salt: data.salt,
      itr: data.itr,
      password: data.hash,
    },
    {
      email_verified: emailVerified,
      active: true,
      role: role,
      verification_token: jwtSign(userData, 'verification', ttl),
    }
  );
};
// module
module.exports = buildUserAttrs;
