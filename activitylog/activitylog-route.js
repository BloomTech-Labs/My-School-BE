const express = require('express');
const router = express.Router();
const ActivitesDB = require('./activitylog-model.js');

router.get('/', (req,res)=>{
    res.status(200).json({message: 'endpoint working'})
});

router.get('/:id', (req,res)=>{
    res.status(200).json({message: 'endpoint working'})
});

router.post('/', (req,res)=>{
    res.status(201).json({message: 'endpoint working'})
});

router.put('/:id', (req,res)=>{
    res.status(200).json({message: 'endpoint working'})
});

router.delete('/:id', (req,res)=>{
    res.status(200).json({message: 'endpoint working'})
});

module.exports = router; 