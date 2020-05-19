exports.up = function (knex) {
  return knex.schema.createTable("activities", (tbl) => {
    tbl.increments();
    tbl.string("name").notNullable();
    tbl.text("description");
    tbl.string("photo");
    tbl.timestamp("created_at").defaultTo(knex.fn.now());
    tbl.decimal("duration");
    tbl.timestamp("completion_date").defaultTo(knex.fn.now());
    tbl.integer("student_id").references("id").inTable("users").onDelete('CASCADE').onUpdate('CASCADE');
    tbl.integer("subject_id").references("id").inTable("subjects").onDelete('CASCADE').onUpdate('CASCADE');
    tbl.integer("activity_type_id").references("id").inTable("activity_types").onDelete('CASCADE').onUpdate('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("activities");
};
