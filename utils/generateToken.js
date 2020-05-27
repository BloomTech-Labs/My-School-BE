const jwt = require('jsonwebtoken');
module.exports = function generateToken(user) {
    const payload = {
      userId: user.id,
      username: user.username,
    };
    const options = {
      expiresIn: '1d',
    };
    return jwt.sign(payload,  process.env.JWT_SECRET, options);
  }