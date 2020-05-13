//Package imports
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Utility imports
const generateToken = require('../utils/generateToken.js');

//Registration Endpoint
router.post('/registration-endpoint', (req, res) => {
  const user = req.body;
  
  //Salt password
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

});

//Login Endpoint
router.post('/login-endpoint', (req, res) => {

});


module.exports = router;
