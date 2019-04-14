const jwtSign = require('../utils/jwtSign');
const constants = require('../config/constants');
//
const buildUserAttrs = (user, data) => {
  const emailVerified = false;
  const role = 1; // guess by default
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
      verification_token: jwtSign(userData, 'verification', constants.ttlVerify),
    }
  );
};
// module
module.exports = buildUserAttrs;
