const jwt = require('jsonwebtoken');
module.exports = function generateToken(user) {
    const payload = {
      userId: user.id,
      username: user.username,
    };
    const options = {
      expiresIn: user.rememberMe ? '30d' : '2h'
    };
    return jwt.sign(payload,  'shh', options);
  }