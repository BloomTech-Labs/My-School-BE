const express = require('express');
const router = express.Router();
const subjectsDB = require('./subjects-model.js');

router.get('/', (req,res) => {
    subjectsDB.getAllSubjects()
    .then(subjects => {
        res.status(200).json(subjects)
    })
    .catch(err => {
        res.status(500).json({errorMessage: 'Internal Server Error', error: err.message})
    })
});

router.get('/:id', (req,res)=>{
    subjectsDB.getSubjectById(req.params.id)
    .then(subject => {
        if(subject){
            res.status(200).json(subject)
        }
        else{
            res.status(404).json({errorMessage: 'No subject with that ID'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Internal Server Error', error: err.message})
    })
});

router.post('/', (req,res)=>{
    if(req.body.name){
        subjectsDB.addSubject(req.body)
        .then(subject => {
            res.status(201).json(subject)
        })
        .catch(err => {
            res.status(500).json({message: 'Internal Server Error', error: err.message})
        })
    }
    else{
        res.status(400).json({errorMessage: 'Subjects must have a name.'})
    }
});

router.put('/:id', (req,res)=>{
    if(req.body.name){
        subjectsDB.editSubject(req.params.id, req.body)
        .then(subject => {
            if(subject){
                res.status(200).json(subject)
            }else{
                res.status(404).json({errorMessage: 'No subject with that ID'})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'Internal Server Error', error: err.message})
        })
    }else{
        res.status(400).json({errorMessage: 'Subject changes require a name'})
    }

});

router.delete('/:id', (req,res)=>{
    subjectsDB.deleteSubject(req.params.id)
    .then(subject => {
        if(subject){
            res.status(200).json({message: 'Subject successfully removed'})
        }else{
            res.status(404).json({errorMessage: 'No subject with that ID'})
        } 
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

module.exports = router; 