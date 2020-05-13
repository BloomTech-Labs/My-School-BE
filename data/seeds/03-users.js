exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          name: "Jane",
          username: "janey",
          password: "admin",
          email: "janey@test.com",
          family_id: 1,
          user_type_id: 1,
        },
        {
          name: "Joe",
          username: "joey",
          password: "admin",
          email: "joey@test.com",
          family_id: 2,
          user_type_id: 1,
        },
        {
          name: "Jim",
          username: "jimmy",
          password: "admin",
          email: "jimmy@test.com",
          family_id: 3,
          user_type_id: 2,
        },
      ]);
    });
};
