const db = require('../data/dbconfig.js');

module.exports = {
    getAllFamilies, 
    getFamilyById,
    addFamily,
    editFamily,
    deleteFamily
};

function getAllFamilies(){
    return db('families')
};

function getFamilyById(id){
    return db('families')
    .first()
    .where({id})
};

function addFamily(family){
    return db('families')
    .insert(family)
    .returning('id')
    .then(([id]) => {
        return getFamilyById(id)
    })
};

function editFamily(id, changes){
    return db('families')
    .where({id})
    .update(changes)
    .then(() => {
        return getFamilyById(id)
    })
};

function deleteFamily(id){
    return db('families').where({id}).del()
};
