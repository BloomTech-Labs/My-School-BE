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

function getAllSubjectsForUser(id){
    return db('activities').where({ subject_id : id });
};

function getAllActivitesForUser(id){
    return db('activities').where({ student_id : id });
};

function addUser(user){
    return db('users').insert(changes).first()
};

function editUser(id, changes){
    return db('users').where({ id }).update(changes);
};

function deleteUser(){
    return db('activities').where({ id }).del()
};