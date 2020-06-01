const router = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken.js');
const Users = require('../users/users-model.js')

router.post('/registration', (req, res) => {
  const user = req.body;
  if(user.username && user.password){
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
  } else{
    res.status(400).json({errorMessage: 'Must include a username and password'})
  }
});

// Login Endpoint
router.post('/login', (req, res) => {
  const {username, password} = req.body;
  Users.getUserBy({username})
  .then(user => {
    if(user && bcrypt.compareSync(password, user.password)){
      const token = generateToken(user);
      res.status(202).json({user, token})
    }else{
      res.status(401).json({message: "Authentication Failed"})
    }
  })
  .catch(err => {
    res.status(500).json({message: err.message})
  })
});


module.exports = router;
