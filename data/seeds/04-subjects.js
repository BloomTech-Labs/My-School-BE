exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("subjects")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("subjects").insert([
        { name: "English" },
        { name: "Math" },
        { name: "Science" },
        { name: "Social Studies" },
        { name: "Art" },
        { name: "Music" },
        { name: "Health" },
        { name: "Physical Education" },
      ]);
    });
};
