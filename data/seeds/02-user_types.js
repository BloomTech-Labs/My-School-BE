exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user_types")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("user_types").insert([
        { name: "admin" },
        { name: "student" },
      ]);
    });
};
