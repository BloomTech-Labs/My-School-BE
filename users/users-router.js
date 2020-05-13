const express = require('express');
const router = express.Router();
const UsersDB = require('./users-model.js');

router.get('/', (req,res)=>{
    UsersDB.getAllUsers()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({message: 'unexpected error in database when trying to get users'}))
});

router.get('/:id', verifyId, (req,res)=>{
    res.status(200).json(req.user);
});

router.get('/:id/subjects', verifyId, (req,res)=>{
    res.status(200).json({message: 'endpoint working'})
});

router.get('/:id/activities', verifyId, (req,res)=>{
    UsersDB.getAllActivitesForUser(req.user.id)
    .then(activites => res.status(200).json(activites))
    .catch(err => res.status(400).json({message: `couldn't locate any activites for the user with an id of ${req.user.id}`}))
});

router.post('/', (req,res)=>{
    res.status(201).json({message: 'endpoint working'})
});

router.put('/:id', verifyId, (req,res)=>{
    res.status(200).json({message: 'endpoint working'})
});

router.delete('/:id', verifyId, (req,res)=>{
    res.status(200).json({message: 'endpoint working'})
});

function verifyId(req,res,next){
    const { id } = req.params;
    UsersDB.getUserById(id)
    .then(user => {
        req.user = user;
        user ? next() : res.status(401).json({message: `there is no record of an user with the id of ${id}`})
    })
    .catch(err => res.status(500).json({message: `unexpected error in database when trying to the user with the id of ${id}`}))
};

module.exports = router; 