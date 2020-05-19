const express = require('express');
const router = express.Router();
const ActivitesDB = require('./activities-model.js');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET 
})

router.get('/', (req,res)=>{
    ActivitesDB.getAllActivities()
    .then(activites => res.status(200).json(activites))
    .catch(err => res.status(500).json({message: 'unexpected error in database when trying to get activites'}))
});

router.get('/:id', verifyId, (req,res)=>{
    res.status(200).json(req.activity);
});

router.post('/', verifyBodyForPost,(req,res)=>{
    const activity = req.body;
    ActivitesDB.addActivity(activity)
    .then(activityId => {
        activityId 
        ? 
        ActivitesDB.getActivityById(activityId[0])
        .then(activity => {
            res.status(201).json(activity)
        })
        .catch(err => res.status(500).json({message: 'unexpected error in database when trying to get activity by id'}))
        :
        res.status(400).json({message: 'activity was not created'})
    })
    .catch(err => res.status(500).json({message: 'unexpected error in database when trying to add an activity'}))
});

router.post('/attachimg', (req,res) => {
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, (err,results)=>{
        ActivitesDB.addActivity({
            ...req.body,
            photo: results.url
        })
        .then(newImage => {
            ActivitesDB.getActivityById(newImage[0])
            .then(activity => res.status(201).json(activity))
            .catch(err => res.status(500).json({message: `unexpected error in database while trying to return the activity with the id of ${newImage[0]}`}))
        })
        .catch(err => {
          res.status(500).json({message: 'unexpected error with database while trying to create add activity'})
        })
    })
})

router.put('/:id/addimg', (req,res)=> {
    const { id } = req.params;
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, (err,results)=>{
        ActivitesDB.editActivity(id,{
            ...req.body,
            photo: results.url,
        })
        .then(newImage => {
            ActivitesDB.getActivityById(id)
            .then(updatedActivity => res.status(201).json(updatedActivity))
            .catch(err => res.status(500).json({message: `unexpected error in database while trying to return the activity with the id of ${id}`}))
        })
        .catch(err => {
          res.status(500).json({message: `unexpected error with database while tryingt to add an image to the activity with the id of ${id}`})
        })
    })
})

router.put('/:id', verifyId, verifyBodyForPut,(req,res)=>{
    const { id } = req.params;
    const activityChanges = req.body;
    ActivitesDB.editActivity(id,activityChanges)
    .then(number => {
        ActivitesDB.getActivityById(id)
        .then(activity => res.status(200).json(activity))
        .catch(err => res.status(500).json({message: `unexpected error in database when trying to get the activity with the id of ${id}`}))
    })
    .catch(err => res.status(500).json({message: `unexpected error in database when trying to edit the activity with the id of ${id}`}))
});

router.delete('/:id', verifyId,(req,res)=>{
    ActivitesDB.deleteActivity(req.params.id)
    .then(number => res.status(200).json(req.activity))
    .catch(err => res.status(500).json({message: `unexpected error in database when trying to delete the activity with the id of ${req.activity.id}`}))
});

function verifyId(req,res,next){
    const { id } = req.params;
    ActivitesDB.getActivityById(id)
    .then(activity => {
        req.activity = activity;
        activity ? next() : res.status(401).json({message: `there is no record of an activity with the id of ${id}`})
    })
    .catch(err => res.status(500).json({message: `unexpected error in database when trying to the activity with the id of ${id}`, err: err.message}))
};

function verifyBodyForPost(req,res,next){
    const activity = req.body; 
    activity.name ? next() : res.status(401).json({message: 'need to provide at least the name of activity in the body of request'})
};

function verifyBodyForPut(req,res,next){
    const activity = req.body;
    Object.entries(activity).length > 0 && activity.name || activity.description || activity.duration || activity.completion_date || activity.subject_id
    ? 
    next() 
    : 
    res.status(400).json({message: 'need to include a valid field change inside of body of request'})
};

module.exports = router; 