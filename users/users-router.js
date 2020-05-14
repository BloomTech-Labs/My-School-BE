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

//will be completed upon merger with sarahs endpoints
router.get('/:id/subjects', verifyId, (req,res)=>{
    res.status(200).json({message: 'endpoint working'})
});

router.get('/:id/activities', verifyId, (req,res)=>{
    UsersDB.getAllActivitesForUser(req.user.id)
    .then(activites => res.status(200).json(activites))
    .catch(err => res.status(400).json({message: `couldn't locate any activites for the user with an id of ${req.user.id}`}))
});

//going to be used for adding students profile in RC 1.1
router.post('/', (req,res)=>{
    res.status(201).json({message: 'endpoint working'})
});

router.put('/:id', verifyId, userBodyVerifaction, (req,res)=>{
    const changes = req.body; 
    UsersDB.editUser(req.user.id, changes)
    .then(number => {
        UsersDB.getUserById(req.user.id)
        .then(updatedUser => res.status(200).json(updatedUser))
        .catch(err => res.status(500).json({message: `unexpected error in database when trying to retireve the updated changes for the user with an id of ${req.user.id}`}))
    })
    .catch(err => res.status(500).json({message: `unexpected error in database when trying to edit the user with an id of ${req.user.id}`}))
});

//needs to be completed with cloudinary
router.put('/:id/profilepic', verifyId, (req,res)=>{
    res.status(200).json({message: 'endpoint working'})
});

router.delete('/:id', verifyId, (req,res)=>{
    UsersDB.deleteUser(req.user.id)
    .then(number => 
        number > 0 
        ? 
        res.status(200).json({message: `the user with the id of ${req.user.id} has been deleted`}) 
        :
        res.status(401).json({message: `there is no record of an user with the id of ${req.user.id}`})
        )
    .catch(err => res.status(500).json({message: `unexpected error in database when trying to the user with the id of ${id}`}))
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

function userBodyVerifaction(req,res,next){
    const userUpdate = req.body;
    Object.entries(userUpdate).length > 0 && userUpdate.name || userUpdate.password || userUpdate.email || userUpdate.family_id
    ? 
    next() 
    : 
    res.status(400).json({message: 'need to include a valid field change inside of body of request'})
}

module.exports = router; 