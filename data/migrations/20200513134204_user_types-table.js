exports.up = function (knex) {
  return knex.schema.createTable("user_types", (tbl) => {
    tbl.increments();
    tbl.string("name").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_types");
};
