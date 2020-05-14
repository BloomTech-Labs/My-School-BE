const express = require('express');
const router = express.Router();
const UsersDB = require('./users-model.js');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET 
})

router.get('/', (req,res)=>{
    UsersDB.getAllUsers()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({message: 'unexpected error in database when trying to get users'}))
});

router.get('/:id', verifyId, (req,res)=>{
    res.status(200).json(req.user);
});

router.get('/:id/activities', verifyId, (req,res)=>{
    UsersDB.getAllActivitesForUser(req.user.id)
    .then(activites => res.status(200).json(activites))
    .catch(err => res.status(400).json({message: `couldn't locate any activites for the user with an id of ${req.user.id}`}))
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

router.put('/:id/profilepic', verifyId, (req,res)=>{
    const { id } = req.params;
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, (err,results)=>{
        console.log('results',results)
        UsersDB.editUser(id,{
          profile_picture: results.url,
        })
        .then(newImage => {
            UsersDB.getUserById(id)
            .then(updatedUser => res.status(201).json(updatedUser))
            .catch(err => res.status(500).json({message: `unexpected error in database while trying to return the updated user with the id of ${id}`}))
        })
        .catch(err => {
          res.status(500).json({message: `unexpected error with database while trying to add a profile picutre to the user with the id of ${id}`})
        })
    })
});

router.delete('/:id', verifyId, (req,res)=>{
    const { id } = req.params;
    console.log(id)
    UsersDB.deleteUser(id)
    .then(number => 
        number > 0 
        ? 
        res.status(200).json({message: `the user with the id of ${id} has been deleted`}) 
        :
        res.status(401).json({message: `there is no record of an user with the id of ${id}`})
        )
    .catch(err => res.status(500).json({mess: err ,message: `unexpected error in database when trying to delete the user with the id of ${id}`}))
});

function verifyId(req,res,next){
    const { id } = req.params;
    UsersDB.getUserById(id)
    .then(user => {
        req.user = user;
        user ? next() : res.status(401).json({message: `there is no record of an user with the id of ${id}`})
    })
    .catch(err => res.status(500).json({message: `unexpected error in database when trying find the user with the id of ${id}`}))
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