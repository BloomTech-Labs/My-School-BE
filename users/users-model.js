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
    .join('families','users.family_id','families.id')
    .join('user_types','users.user_type_id',"user_types.id")
    .select('users.*','families.name as familyName','user_types.name as userType');
};

function getUserById(id){
    return db('users')
    .join('families','users.family_id','families.id')
    .join('user_types','users.user_type_id',"user_types.id")
    .select('users.*','families.name as familyName','user_types.name as userType')
    .where('users.id','=',id).first();
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