const db = require('../data/dbconfig.js');

module.exports = {
    getAllSubjects, 
    getSubjectById,
    addSubject,
    editSubject,
    deleteSubject
};

function getAllSubjects(){
    return db('subjects')
};

function getSubjectById(id){
    return db('subjects')
    .first()
    .where({id})
};

function addSubject(subject){
    return db('subjects')
    .insert(subject)
    .returning('id')
    .then(([id]) => {
        return getSubjectById(id)
    })
};

function editSubject(id, changes){
    return db('subjects')
    .where({id})
    .update(changes)
    .then(() => {
        return getSubjectById(id)
    })
};

function deleteSubject(id){
    return db('subjects').where({id}).del()
};