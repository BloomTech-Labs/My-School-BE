const db = require('../data/dbconfig.js');

module.exports = {
    getAllUsers, 
    getAllActivitesForUser,
    getUserById,
    editUser,
    deleteUser
};

function getAllUsers(){
    return db('users')
};

function getUserById(id){
    return db('users').where({ id }).first()
};

function getAllActivitesForUser(id){
    return db('activities').where({ student_id : id });
};

function editUser(id, changes){
    return db('users').where({ id }).update(changes);
};

function deleteUser(id){
    return db('users').where({ id }).del()
};