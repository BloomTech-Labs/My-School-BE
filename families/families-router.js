const express = require('express');
const router = express.Router();
const familiesDB = require('./families-model.js');

router.get('/', (req,res)=>{
    familiesDB.getAllFamilies()
    .then(families => {
        res.status(200).json(families)
    })
    .catch(err => {
        res.status(500).json({errorMessage: 'Internal Server Error', error: err.message})
    })
});

router.get('/:id', (req,res)=>{
    familiesDB.getFamilyById(req.params.id)
    .then(family => {
        if(family){
            res.status(200).json(family)
        }
        else{
            res.status(404).json({errorMessage: 'No family with that ID'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Internal Server Error', error: err.message})
    })
});

router.post('/', (req,res)=>{
    if(req.body.name){
        familiesDB.addFamily(req.body)
        .then(family => {
            res.status(201).json(family)
        })
        .catch(err => {
            res.status(500).json({message: 'Internal Server Error', error: err.message})
        })
    }
    else{
        res.status(400).json({errorMessage: 'Families must have a name.'})
    }
});

router.put('/:id', (req,res)=>{
    if(req.body.name){
        familiesDB.editFamily(req.params.id, req.body)
        .then(family => {
            if(family){
                res.status(200).json(family)
            }else{
                res.status(404).json({errorMessage: 'No family with that ID'})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'Internal Server Error', error: err.message})
        })
    }else{
        res.status(400).json({errorMessage: "You have not made any changes."})
    }

});

router.delete('/:id', (req,res)=>{
    familiesDB.deleteFamily(req.params.id)
    .then(family => {
        if(family){
            res.status(200).json({message: 'Family successfully removed'})
        }else{
            res.status(404).json({errorMessage: 'No family with that ID'})
        } 
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

module.exports = router; 