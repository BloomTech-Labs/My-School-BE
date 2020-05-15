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
    .join('subjects','activities.subject_id','subjects.id')
    .join('users','activities.student_id','users.id')
    .join('activity_types','activities.activity_type_id','activity_types.id')
    .select('activities.*','users.name as studentsName','subjects.name as subject','activity_types.name as activityType');
};

function getActivityById(id){
    return db('activities')
    .join('subjects','activities.subject_id','subjects.id')
    .join('users','activities.student_id','users.id')
    .join('activity_types','activities.activity_type_id','activity_types.id')
    .select('activities.*','users.name as studentsName','subjects.name as subject','activity_types.name as activityType')
    .where('activities.id','=', id )
    .first();
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