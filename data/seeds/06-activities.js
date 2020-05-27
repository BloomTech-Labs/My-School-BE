exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("activities")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("activities").insert([
        {
          name: "Assignment #1",
          description:
            "Here's a bit of a description about this exciting and educational activity.",
          duration: 1.0,
          student_id: 3,
          subject_id: 1,
          activity_type_id: 1,
        },
        {
          name: "Assignment #2",
          description:
            "Here's a bit of a description about this exciting and educational activity.",
          duration: 1.0,
          student_id: 3,
          subject_id: 2,
          activity_type_id: 2,
        },
        {
          name: "Assignment #3",
          description:
            "Here's a bit of a description about this exciting and educational activity.",
          duration: 1.0,
          student_id: 3,
          subject_id: 3,
          activity_type_id: 3,
        },
        {
          name: "Assignment #4",
          description:
            "Here's a bit of a description about this exciting and educational activity.",
          duration: 1.0,
          student_id: 3,
          subject_id: 4,
          activity_type_id: 1,
        },
        {
          name: "Assignment #5",
          description:
            "Here's a bit of a description about this exciting and educational activity.",
          duration: 1.0,
          student_id: 3,
          subject_id: 5,
          activity_type_id: 2,
        },
        {
          name: "Assignment #6",
          description:
            "Here's a bit of a description about this exciting and educational activity.",
          duration: 1.0,
          student_id: 3,
          subject_id: 6,
          activity_type_id: 3,
        },
      ]);
    });
};
