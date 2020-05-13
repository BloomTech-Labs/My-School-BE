exports.up = function (knex) {
  return knex.schema.createTable("activity_types", (tbl) => {
    tbl.increments();
    tbl.string("name").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("activity_types");
};
