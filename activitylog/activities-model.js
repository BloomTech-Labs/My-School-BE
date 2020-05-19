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
    .leftJoin('subjects','activities.subject_id','subjects.id')
    .leftJoin('users','activities.student_id','users.id')
    .leftJoin('activity_types','activities.activity_type_id','activity_types.id')
    .select('activities.*','users.name as studentsName','subjects.name as subject','activity_types.name as activityType');
}

function getActivityById(id){
    return db('activities')
    .leftJoin('subjects','activities.subject_id','subjects.id')
    .leftJoin('users','activities.student_id','users.id')
    .leftJoin('activity_types','activities.activity_type_id','activity_types.id')
    .select('activities.*','users.name as studentsName','subjects.name as subject','activity_types.name as activityType')
    .where('activities.id','=', id )
}

function addActivity(activity){
    return db('activities').insert(activity).returning('id')
};

function editActivity(id, changes){
    return db('activities').where({ id }).update(changes, 'id')
};

function deleteActivity(id){
    return db('activities').where({ id }).del()
};