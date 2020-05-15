exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("activity_types")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("activity_types").insert([
        { name: "Independent Study" },
        { name: "Field Trip" },
        { name: "Research and Report" },
      ]);
    });
};
