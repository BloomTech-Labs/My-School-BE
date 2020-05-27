const db = require("../data/dbconfig.js");

module.exports = {
  getAllUsers,
  getAllActivitesForUser,
  getUserById,
  editUser,
  deleteUser,
  addUser,
  getUserBy
};

function getAllUsers() {
  return db("users")
    .leftJoin("families", "users.family_id", "families.id")
    .leftJoin("user_types", "users.user_type_id", "user_types.id")
    .select(
      "users.*",
      "families.name as familyName",
      "user_types.name as userType"
    );
}

function getUserById(id) {
  return db("users")
    .leftJoin("families", "users.family_id", "families.id")
    .leftJoin("user_types", "users.user_type_id", "user_types.id")
    .select(
      "users.*",
      "families.name as familyName",
      "user_types.name as userType"
    )
    .where("users.id", "=", id)
    .first();
}

function getAllActivitesForUser(id) {
  return db("activities")
    .leftJoin("subjects", "activities.subject_id", "subjects.id")
    .leftJoin("users", "activities.student_id", "users.id")
    .leftJoin(
      "activity_types",
      "activities.activity_type_id",
      "activity_types.id"
    )
    .select(
      "activities.*",
      "users.name as studentsName",
      "subjects.name as subject",
      "activity_types.name as activityType"
    )
    .where("student_id", "=", id);
}

function editUser(id, changes) {
  return db("users").where({ id }).update(changes);
}

function deleteUser(id) {
  return db("users").where({ id }).del();
}

function addUser(user) {
  return db("users")
    .returning("id")
    .insert(user)
    .then(([id]) => {
      return getUserById(id);
    });
}

function getUserBy(filter){
  return db('users').first().where(filter)
}