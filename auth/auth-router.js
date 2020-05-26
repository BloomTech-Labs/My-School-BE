const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken.js');
const Users = require('../users/users-model.js')

router.post('/registration', (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  Users.addUser(user)
  .then((user) => {
    const token = generateToken(user);
    res.status(201).json({user, token})
  })
  .catch((err) => {
    res.status(500).json({errorMessage: err.message})
  })
});

//Login Endpoint
router.post('/login-endpoint', (req, res) => {

});


module.exports = router;
