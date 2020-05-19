exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user_types")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("user_types").insert([
        { name: "admin" },
        { name: "student" },
      ]);
    });
};
