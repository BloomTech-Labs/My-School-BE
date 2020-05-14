const db = require('../data/dbconfig.js');

module.exports = {
    getAllActivities, 
    getActivityById,
    addActivity,
    editActivity,
    deleteActivity
};

function getAllActivities(){
    return db('activities')
};

function getActivityById(id){
    return db('activities').where({ id }).first()
};

function addActivity(activity){
    return db('activities').insert(activity, 'id')
};

function editActivity(id, changes){
    return db('activities').where({ id }).update(changes, 'id')
};

function deleteActivity(id){
    return db('activities').where({ id }).del()
};