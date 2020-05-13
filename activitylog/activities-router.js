const express = require('express');
const router = express.Router();
const ActivitesDB = require('./activities-model.js');

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
        .then(activity => res.status(201).json(activity))
        .catch(err => res.status(500).json({message: 'unexpected error in database when trying to get activity by id'}))
        :
        res.status(400).json({message: 'activity was not created'})
    })
    .catch(err => res.status(500).json({message: 'unexpected error in database when trying to add an activity'}))
});

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
    ActivitesDB.deleteActivity(req.activity.id)
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
    .catch(err => res.status(500).json({message: `unexpected error in database when trying to the activity with the id of ${id}`}))
};

function verifyBodyForPost(req,res,next){
    const activity = req.body; 
    activity.name ? next() : res.status(401).json({message: 'need to provide at least the name of activity in the body of request'})
};

function verifyBodyForPut(req,res,next){
    const activity = req.body;
    Object.entries(activity).length > 0 && activity.name || activity.description
    ? 
    next() 
    : 
    res.status(400).json({message: 'need to include a valid field change inside of body of request'})
};

module.exports = router; 