const db = require('../data/dbconfig.js');

module.exports = {
    getAllUsers, 
    getAllSubjectsForUser,
    getAllActivitesForUser,
    getUserById,
    addUser,
    editUser,
    deleteUser
};

function getAllUsers(){
    return db('users')
};

function getUserById(id){
    return db('users').where({ id }).first()
};

function getAllSubjectsForUser(){
    return null
};

function getAllActivitesForUser(id){
    return db('activities').where({ student_id : id });
};

function addUser(){
    return null
};

function editUser(){
    return null
};

function deleteUser(){
    return null
};